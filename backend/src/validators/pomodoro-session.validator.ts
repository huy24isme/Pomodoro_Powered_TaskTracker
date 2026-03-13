import { z } from "zod";

export const createPomodoroSessionSchema = z.object({
  taskId: z.string().optional(),
  workspaceId: z.string().optional(),
  type: z.enum(["focus", "short_break", "long_break"]),
  duration: z.number().int().min(1, "Duration must be at least 1 minute"),
  musicTrackId: z.string().optional(),
});

export const updatePomodoroSessionSchema = z.object({
  status: z.enum(["completed", "cancelled"]),
});
