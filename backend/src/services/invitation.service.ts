import { Invitation } from "@models/invitation.model";
import { Workspace } from "@models/workspace.model";
import { HttpError } from "@middlewares/error.middleware";
import * as workspaceService from "./workspace.service";

export const createInvitation = async (
  workspaceId: string,
  invitedBy: string,
  data: { invitedEmail: string; role?: string },
) => {
  const workspace = await workspaceService.getWorkspaceById(workspaceId, invitedBy);

  const member = workspace.members.find(
    (m) => m.userId.toString() === invitedBy,
  );
  if (!member || !["owner", "admin"].includes(member.role)) {
    throw new HttpError("Only owners and admins can invite members", 403);
  }

  const existing = await Invitation.findOne({
    workspaceId,
    invitedEmail: data.invitedEmail.toLowerCase(),
    status: "pending",
  });
  if (existing) {
    throw new HttpError("Invitation already pending for this email", 409);
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  return Invitation.create({
    ...data,
    workspaceId,
    invitedBy,
    expiresAt,
  });
};

export const getInvitationsByWorkspace = async (
  workspaceId: string,
  userId: string,
) => {
  await workspaceService.getWorkspaceById(workspaceId, userId);
  return Invitation.find({ workspaceId }).sort({ createdAt: -1 });
};

export const respondToInvitation = async (
  id: string,
  userId: string,
  userEmail: string,
  action: "accept" | "decline",
) => {
  const invitation = await Invitation.findById(id);
  if (!invitation) {
    throw new HttpError("Invitation not found", 404);
  }

  if (invitation.invitedEmail !== userEmail.toLowerCase()) {
    throw new HttpError("This invitation is not for you", 403);
  }

  if (invitation.status !== "pending") {
    throw new HttpError("Invitation is no longer pending", 400);
  }

  invitation.status = action === "accept" ? "accepted" : "declined";
  await invitation.save();

  if (action === "accept") {
    const workspace = await Workspace.findById(invitation.workspaceId);
    if (workspace) {
      const alreadyMember = workspace.members.some(
        (m) => m.userId.toString() === userId,
      );
      if (!alreadyMember) {
        workspace.members.push({
          userId: userId as any,
          role: invitation.role,
          joinedAt: new Date(),
        });
        await workspace.save();
      }
    }
  }

  return invitation;
};
