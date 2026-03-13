import { Request, Response } from "express";
import { asyncHandler } from "@utils/async-handler";
import { apiResponse } from "@utils/api-response";
import * as messageService from "@services/message.service";

export const sendMessage = asyncHandler(
  async (req: Request, res: Response) => {
    const message = await messageService.sendMessage(
      req.params.workspaceId,
      req.user!.id,
      req.body,
    );
    apiResponse({
      res,
      statusCode: 201,
      message: "Message sent",
      data: message,
    });
  },
);

export const getMessages = asyncHandler(
  async (req: Request, res: Response) => {
    const { messages, meta } = await messageService.getMessagesByWorkspace(
      req.params.workspaceId,
      req.user!.id,
      req.query as any,
    );
    apiResponse({ res, data: messages, meta });
  },
);

export const updateMessage = asyncHandler(
  async (req: Request, res: Response) => {
    const message = await messageService.updateMessage(
      req.params.id,
      req.user!.id,
      req.body.content,
    );
    apiResponse({ res, message: "Message updated", data: message });
  },
);

export const deleteMessage = asyncHandler(
  async (req: Request, res: Response) => {
    await messageService.deleteMessage(req.params.id, req.user!.id);
    apiResponse({ res, message: "Message deleted" });
  },
);
