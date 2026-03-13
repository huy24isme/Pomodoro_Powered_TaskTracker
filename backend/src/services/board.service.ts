import { Board } from "@models/board.model";
import { HttpError } from "@middlewares/error.middleware";
import * as workspaceService from "./workspace.service";

export const createBoard = async (
  workspaceId: string,
  userId: string,
  data: { name: string; position?: number; color?: string; type?: string },
) => {
  await workspaceService.getWorkspaceById(workspaceId, userId);

  const board = await Board.create({
    ...data,
    workspaceId,
    createdBy: userId,
  });
  return board;
};

export const getBoardsByWorkspace = async (
  workspaceId: string,
  userId: string,
) => {
  await workspaceService.getWorkspaceById(workspaceId, userId);
  return Board.find({ workspaceId, isArchived: false }).sort({ position: 1 });
};

export const getBoardById = async (id: string, userId: string) => {
  const board = await Board.findById(id);
  if (!board) {
    throw new HttpError("Board not found", 404);
  }

  await workspaceService.getWorkspaceById(
    board.workspaceId.toString(),
    userId,
  );
  return board;
};

export const updateBoard = async (
  id: string,
  userId: string,
  data: {
    name?: string;
    position?: number;
    color?: string;
    type?: string;
    isArchived?: boolean;
  },
) => {
  const board = await getBoardById(id, userId);
  Object.assign(board, data);
  await board.save();
  return board;
};

export const deleteBoard = async (id: string, userId: string) => {
  const board = await getBoardById(id, userId);
  await board.deleteOne();
};
