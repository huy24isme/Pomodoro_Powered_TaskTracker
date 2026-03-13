import { Note } from "@models/note.model";
import { HttpError } from "@middlewares/error.middleware";
import * as taskService from "./task.service";

export const createNote = async (
  taskId: string,
  authorId: string,
  data: { content: string },
) => {
  await taskService.getTaskById(taskId, authorId);
  return Note.create({ ...data, taskId, authorId });
};

export const getNotesByTask = async (taskId: string, userId: string) => {
  await taskService.getTaskById(taskId, userId);
  return Note.find({ taskId }).sort({ createdAt: -1 });
};

export const getNoteById = async (id: string, userId: string) => {
  const note = await Note.findById(id);
  if (!note) {
    throw new HttpError("Note not found", 404);
  }
  await taskService.getTaskById(note.taskId.toString(), userId);
  return note;
};

export const updateNote = async (
  id: string,
  userId: string,
  data: { content?: string; isPinned?: boolean },
) => {
  const note = await getNoteById(id, userId);
  Object.assign(note, data);
  await note.save();
  return note;
};

export const deleteNote = async (id: string, userId: string) => {
  const note = await getNoteById(id, userId);
  await note.deleteOne();
};
