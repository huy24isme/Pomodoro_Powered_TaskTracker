import { Request, Response } from "express";
import { asyncHandler } from "@utils/async-handler";
import { apiResponse } from "@utils/api-response";
import * as notificationService from "@services/notification.service";

export const getNotifications = asyncHandler(
  async (req: Request, res: Response) => {
    const { notifications, meta } =
      await notificationService.getNotificationsByUser(
        req.user!.id,
        req.query as any,
      );
    apiResponse({ res, data: notifications, meta });
  },
);

export const markRead = asyncHandler(
  async (req: Request, res: Response) => {
    const notification = await notificationService.markRead(
      req.params.id,
      req.user!.id,
    );
    apiResponse({ res, message: "Notification marked as read", data: notification });
  },
);

export const markAllRead = asyncHandler(
  async (req: Request, res: Response) => {
    await notificationService.markAllRead(req.user!.id);
    apiResponse({ res, message: "All notifications marked as read" });
  },
);

export const deleteNotification = asyncHandler(
  async (req: Request, res: Response) => {
    await notificationService.deleteNotification(req.params.id, req.user!.id);
    apiResponse({ res, message: "Notification deleted" });
  },
);
