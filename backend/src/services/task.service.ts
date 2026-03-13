import { Task } from "@models/task.model";
import { Board } from "@models/board.model";
import { HttpError } from "@middlewares/error.middleware";
import * as workspaceService from "./workspace.service";

export const createTask = async (
  boardId: string,
  userId: string,
  data: {
    title: string;
    description?: string;
    priority?: string;
    position?: number;
    assignees?: string[];
    labels?: string[];
    dueDate?: string;
    pomodoroEstimate?: number;
  },
) => {
  const board = await Board.findById(boardId);
  if (!board) {
    throw new HttpError("Board not found", 404);
  }

  await workspaceService.getWorkspaceById(
    board.workspaceId.toString(),
    userId,
  );

  const task = await Task.create({
    ...data,
    boardId,
    workspaceId: board.workspaceId,
  });
  return task;
};

export const getTasksByBoard = async (
  boardId: string,
  userId: string,
) => {
  const board = await Board.findById(boardId);
  if (!board) {
    throw new HttpError("Board not found", 404);
  }

  await workspaceService.getWorkspaceById(
    board.workspaceId.toString(),
    userId,
  );

  return Task.find({ boardId, isArchived: false }).sort({ position: 1 });
};

export const getTaskById = async (id: string, userId: string) => {
  const task = await Task.findById(id);
  if (!task) {
    throw new HttpError("Task not found", 404);
  }

  await workspaceService.getWorkspaceById(
    task.workspaceId.toString(),
    userId,
  );
  return task;
};

export const updateTask = async (
  id: string,
  userId: string,
  data: Record<string, any>,
) => {
  const task = await getTaskById(id, userId);
  Object.assign(task, data);
  await task.save();
  return task;
};

export const moveTask = async (
  id: string,
  userId: string,
  boardId: string,
  position: number,
) => {
  const task = await getTaskById(id, userId);

  const board = await Board.findById(boardId);
  if (!board) {
    throw new HttpError("Target board not found", 404);
  }

  await workspaceService.getWorkspaceById(
    board.workspaceId.toString(),
    userId,
  );

  task.boardId = board._id as any;
  task.position = position;
  await task.save();
  return task;
};

export const deleteTask = async (id: string, userId: string) => {
  const task = await getTaskById(id, userId);
  await task.deleteOne();
};
