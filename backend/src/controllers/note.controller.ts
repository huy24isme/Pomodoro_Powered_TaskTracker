import { Request, Response } from "express";
import { asyncHandler } from "@utils/async-handler";
import { apiResponse } from "@utils/api-response";
import * as noteService from "@services/note.service";

export const createNote = asyncHandler(
  async (req: Request, res: Response) => {
    const note = await noteService.createNote(
      req.params.taskId,
      req.user!.id,
      req.body,
    );
    apiResponse({ res, statusCode: 201, message: "Note created", data: note });
  },
);

export const getNotesByTask = asyncHandler(
  async (req: Request, res: Response) => {
    const notes = await noteService.getNotesByTask(
      req.params.taskId,
      req.user!.id,
    );
    apiResponse({ res, data: notes });
  },
);

export const updateNote = asyncHandler(
  async (req: Request, res: Response) => {
    const note = await noteService.updateNote(
      req.params.id,
      req.user!.id,
      req.body,
    );
    apiResponse({ res, message: "Note updated", data: note });
  },
);

export const deleteNote = asyncHandler(
  async (req: Request, res: Response) => {
    await noteService.deleteNote(req.params.id, req.user!.id);
    apiResponse({ res, message: "Note deleted" });
  },
);
