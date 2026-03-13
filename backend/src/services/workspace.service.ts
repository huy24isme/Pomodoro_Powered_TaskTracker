import crypto from "crypto";
import { Workspace } from "@models/workspace.model";
import { HttpError } from "@middlewares/error.middleware";

export const createWorkspace = async (
  ownerId: string,
  data: { name: string; description?: string },
) => {
  const inviteCode = crypto.randomBytes(6).toString("hex");
  const workspace = await Workspace.create({
    ...data,
    ownerId,
    inviteCode,
    members: [{ userId: ownerId, role: "owner", joinedAt: new Date() }],
  });
  return workspace;
};

export const getWorkspaces = async (userId: string) => {
  return Workspace.find({ "members.userId": userId });
};

export const getWorkspaceById = async (id: string, userId: string) => {
  const workspace = await Workspace.findById(id);
  if (!workspace) {
    throw new HttpError("Workspace not found", 404);
  }

  const isMember = workspace.members.some(
    (m) => m.userId.toString() === userId,
  );
  if (!isMember) {
    throw new HttpError("Not a member of this workspace", 403);
  }

  return workspace;
};

export const updateWorkspace = async (
  id: string,
  userId: string,
  data: { name?: string; description?: string },
) => {
  const workspace = await getWorkspaceById(id, userId);

  const member = workspace.members.find(
    (m) => m.userId.toString() === userId,
  );
  if (!member || !["owner", "admin"].includes(member.role)) {
    throw new HttpError("Only owners and admins can update workspaces", 403);
  }

  Object.assign(workspace, data);
  await workspace.save();
  return workspace;
};

export const deleteWorkspace = async (id: string, userId: string) => {
  const workspace = await Workspace.findById(id);
  if (!workspace) {
    throw new HttpError("Workspace not found", 404);
  }

  if (workspace.ownerId.toString() !== userId) {
    throw new HttpError("Only the owner can delete a workspace", 403);
  }

  await workspace.deleteOne();
};

export const addMember = async (
  workspaceId: string,
  userId: string,
  newMemberId: string,
  role: "admin" | "member" = "member",
) => {
  const workspace = await getWorkspaceById(workspaceId, userId);

  const member = workspace.members.find(
    (m) => m.userId.toString() === userId,
  );
  if (!member || !["owner", "admin"].includes(member.role)) {
    throw new HttpError("Only owners and admins can add members", 403);
  }

  const alreadyMember = workspace.members.some(
    (m) => m.userId.toString() === newMemberId,
  );
  if (alreadyMember) {
    throw new HttpError("User is already a member", 409);
  }

  workspace.members.push({
    userId: newMemberId as any,
    role,
    joinedAt: new Date(),
  });
  await workspace.save();
  return workspace;
};

export const removeMember = async (
  workspaceId: string,
  userId: string,
  targetUserId: string,
) => {
  const workspace = await getWorkspaceById(workspaceId, userId);

  const member = workspace.members.find(
    (m) => m.userId.toString() === userId,
  );
  if (!member || !["owner", "admin"].includes(member.role)) {
    throw new HttpError("Only owners and admins can remove members", 403);
  }

  if (workspace.ownerId.toString() === targetUserId) {
    throw new HttpError("Cannot remove the workspace owner", 400);
  }

  workspace.members = workspace.members.filter(
    (m) => m.userId.toString() !== targetUserId,
  );
  await workspace.save();
  return workspace;
};
