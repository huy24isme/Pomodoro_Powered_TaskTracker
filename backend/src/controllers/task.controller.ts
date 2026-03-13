import { Request, Response } from "express";
import { asyncHandler } from "@utils/async-handler";
import { apiResponse } from "@utils/api-response";
import * as taskService from "@services/task.service";

export const createTask = asyncHandler(
  async (req: Request, res: Response) => {
    const task = await taskService.createTask(
      req.params.boardId,
      req.user!.id,
      req.body,
    );
    apiResponse({ res, statusCode: 201, message: "Task created", data: task });
  },
);

export const getTasksByBoard = asyncHandler(
  async (req: Request, res: Response) => {
    const tasks = await taskService.getTasksByBoard(
      req.params.boardId,
      req.user!.id,
    );
    apiResponse({ res, data: tasks });
  },
);

export const getTaskById = asyncHandler(
  async (req: Request, res: Response) => {
    const task = await taskService.getTaskById(req.params.id, req.user!.id);
    apiResponse({ res, data: task });
  },
);

export const updateTask = asyncHandler(
  async (req: Request, res: Response) => {
    const task = await taskService.updateTask(
      req.params.id,
      req.user!.id,
      req.body,
    );
    apiResponse({ res, message: "Task updated", data: task });
  },
);

export const moveTask = asyncHandler(
  async (req: Request, res: Response) => {
    const task = await taskService.moveTask(
      req.params.id,
      req.user!.id,
      req.body.boardId,
      req.body.position,
    );
    apiResponse({ res, message: "Task moved", data: task });
  },
);

export const deleteTask = asyncHandler(
  async (req: Request, res: Response) => {
    await taskService.deleteTask(req.params.id, req.user!.id);
    apiResponse({ res, message: "Task deleted" });
  },
);
