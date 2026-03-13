import { Message } from "@models/message.model";
import { HttpError } from "@middlewares/error.middleware";
import { parsePagination, paginationMeta } from "@utils/pagination";
import * as workspaceService from "./workspace.service";

export const sendMessage = async (
  workspaceId: string,
  senderId: string,
  data: { content: string; replyTo?: string; attachments?: string[] },
) => {
  await workspaceService.getWorkspaceById(workspaceId, senderId);
  return Message.create({ ...data, workspaceId, senderId });
};

export const getMessagesByWorkspace = async (
  workspaceId: string,
  userId: string,
  query: { page?: string; limit?: string },
) => {
  await workspaceService.getWorkspaceById(workspaceId, userId);
  const { skip, limit, page } = parsePagination(query);
  const [messages, total] = await Promise.all([
    Message.find({ workspaceId }).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Message.countDocuments({ workspaceId }),
  ]);
  return { messages, meta: paginationMeta(page, limit, total) };
};

export const updateMessage = async (
  id: string,
  userId: string,
  content: string,
) => {
  const message = await Message.findById(id);
  if (!message) {
    throw new HttpError("Message not found", 404);
  }
  if (message.senderId.toString() !== userId) {
    throw new HttpError("You can only edit your own messages", 403);
  }
  message.content = content;
  message.isEdited = true;
  await message.save();
  return message;
};

export const deleteMessage = async (id: string, userId: string) => {
  const message = await Message.findById(id);
  if (!message) {
    throw new HttpError("Message not found", 404);
  }
  if (message.senderId.toString() !== userId) {
    throw new HttpError("You can only delete your own messages", 403);
  }
  await message.deleteOne();
};
