import { Request, Response } from "express";
import { asyncHandler } from "@utils/async-handler";
import { apiResponse } from "@utils/api-response";
import * as boardService from "@services/board.service";

export const createBoard = asyncHandler(
  async (req: Request, res: Response) => {
    const board = await boardService.createBoard(
      req.params.workspaceId,
      req.user!.id,
      req.body,
    );
    apiResponse({ res, statusCode: 201, message: "Board created", data: board });
  },
);

export const getBoardsByWorkspace = asyncHandler(
  async (req: Request, res: Response) => {
    const boards = await boardService.getBoardsByWorkspace(
      req.params.workspaceId,
      req.user!.id,
    );
    apiResponse({ res, data: boards });
  },
);

export const getBoardById = asyncHandler(
  async (req: Request, res: Response) => {
    const board = await boardService.getBoardById(req.params.id, req.user!.id);
    apiResponse({ res, data: board });
  },
);

export const updateBoard = asyncHandler(
  async (req: Request, res: Response) => {
    const board = await boardService.updateBoard(
      req.params.id,
      req.user!.id,
      req.body,
    );
    apiResponse({ res, message: "Board updated", data: board });
  },
);

export const deleteBoard = asyncHandler(
  async (req: Request, res: Response) => {
    await boardService.deleteBoard(req.params.id, req.user!.id);
    apiResponse({ res, message: "Board deleted" });
  },
);
