import { PomodoroSession } from "@models/pomodoro-session.model";
import { Task } from "@models/task.model";
import { HttpError } from "@middlewares/error.middleware";
import { parsePagination, paginationMeta } from "@utils/pagination";

export const startSession = async (
  userId: string,
  data: {
    taskId?: string;
    workspaceId?: string;
    type: string;
    duration: number;
    musicTrackId?: string;
  },
) => {
  return PomodoroSession.create({
    ...data,
    userId,
    startedAt: new Date(),
  });
};

export const updateSession = async (
  id: string,
  userId: string,
  status: "completed" | "cancelled",
) => {
  const session = await PomodoroSession.findOne({ _id: id, userId });
  if (!session) {
    throw new HttpError("Pomodoro session not found", 404);
  }

  if (session.status !== "running") {
    throw new HttpError("Session is not running", 400);
  }

  session.status = status;
  session.endedAt = new Date();
  await session.save();

  // Increment pomodorosCompleted on task if completed focus session
  if (status === "completed" && session.type === "focus" && session.taskId) {
    await Task.findByIdAndUpdate(session.taskId, {
      $inc: { pomodorosCompleted: 1 },
    });
  }

  return session;
};

export const getSessionsByUser = async (
  userId: string,
  query: { page?: string; limit?: string },
) => {
  const { skip, limit, page } = parsePagination(query);
  const [sessions, total] = await Promise.all([
    PomodoroSession.find({ userId }).sort({ startedAt: -1 }).skip(skip).limit(limit),
    PomodoroSession.countDocuments({ userId }),
  ]);
  return { sessions, meta: paginationMeta(page, limit, total) };
};

export const getSessionById = async (id: string, userId: string) => {
  const session = await PomodoroSession.findOne({ _id: id, userId });
  if (!session) {
    throw new HttpError("Pomodoro session not found", 404);
  }
  return session;
};
