import { Request, Response } from "express";
import { asyncHandler } from "@utils/async-handler";
import { apiResponse } from "@utils/api-response";
import * as workspaceService from "@services/workspace.service";

export const createWorkspace = asyncHandler(
  async (req: Request, res: Response) => {
    const workspace = await workspaceService.createWorkspace(
      req.user!.id,
      req.body,
    );
    apiResponse({
      res,
      statusCode: 201,
      message: "Workspace created successfully",
      data: workspace,
    });
  },
);

export const getWorkspaces = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaces = await workspaceService.getWorkspaces(req.user!.id);
    apiResponse({ res, data: workspaces });
  },
);

export const getWorkspaceById = asyncHandler(
  async (req: Request, res: Response) => {
    const workspace = await workspaceService.getWorkspaceById(
      req.params.id,
      req.user!.id,
    );
    apiResponse({ res, data: workspace });
  },
);

export const updateWorkspace = asyncHandler(
  async (req: Request, res: Response) => {
    const workspace = await workspaceService.updateWorkspace(
      req.params.id,
      req.user!.id,
      req.body,
    );
    apiResponse({ res, message: "Workspace updated", data: workspace });
  },
);

export const deleteWorkspace = asyncHandler(
  async (req: Request, res: Response) => {
    await workspaceService.deleteWorkspace(req.params.id, req.user!.id);
    apiResponse({ res, message: "Workspace deleted" });
  },
);

export const addMember = asyncHandler(
  async (req: Request, res: Response) => {
    const workspace = await workspaceService.addMember(
      req.params.id,
      req.user!.id,
      req.body.userId,
      req.body.role,
    );
    apiResponse({ res, message: "Member added", data: workspace });
  },
);

export const removeMember = asyncHandler(
  async (req: Request, res: Response) => {
    const workspace = await workspaceService.removeMember(
      req.params.id,
      req.user!.id,
      req.params.userId,
    );
    apiResponse({ res, message: "Member removed", data: workspace });
  },
);
