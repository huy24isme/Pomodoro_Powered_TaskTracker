import { Request, Response } from "express";
import { asyncHandler } from "@utils/async-handler";
import { apiResponse } from "@utils/api-response";
import * as invitationService from "@services/invitation.service";

export const createInvitation = asyncHandler(
  async (req: Request, res: Response) => {
    const invitation = await invitationService.createInvitation(
      req.params.workspaceId,
      req.user!.id,
      req.body,
    );
    apiResponse({
      res,
      statusCode: 201,
      message: "Invitation sent",
      data: invitation,
    });
  },
);

export const getInvitations = asyncHandler(
  async (req: Request, res: Response) => {
    const invitations = await invitationService.getInvitationsByWorkspace(
      req.params.workspaceId,
      req.user!.id,
    );
    apiResponse({ res, data: invitations });
  },
);

export const respondToInvitation = asyncHandler(
  async (req: Request, res: Response) => {
    const invitation = await invitationService.respondToInvitation(
      req.params.id,
      req.user!.id,
      req.user!.email,
      req.body.action,
    );
    apiResponse({ res, message: "Invitation response recorded", data: invitation });
  },
);
