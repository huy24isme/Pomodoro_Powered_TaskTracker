import { Notification } from "@models/notification.model";
import { HttpError } from "@middlewares/error.middleware";
import { parsePagination, paginationMeta } from "@utils/pagination";

export const createNotification = async (data: {
  userId: string;
  type: string;
  message: string;
  link?: string;
}) => {
  return Notification.create(data);
};

export const getNotificationsByUser = async (
  userId: string,
  query: { page?: string; limit?: string },
) => {
  const { skip, limit, page } = parsePagination(query);
  const [notifications, total] = await Promise.all([
    Notification.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Notification.countDocuments({ userId }),
  ]);
  return { notifications, meta: paginationMeta(page, limit, total) };
};

export const markRead = async (id: string, userId: string) => {
  const notification = await Notification.findOne({ _id: id, userId });
  if (!notification) {
    throw new HttpError("Notification not found", 404);
  }
  notification.isRead = true;
  await notification.save();
  return notification;
};

export const markAllRead = async (userId: string) => {
  await Notification.updateMany({ userId, isRead: false }, { isRead: true });
};

export const deleteNotification = async (id: string, userId: string) => {
  const notification = await Notification.findOne({ _id: id, userId });
  if (!notification) {
    throw new HttpError("Notification not found", 404);
  }
  await notification.deleteOne();
};
