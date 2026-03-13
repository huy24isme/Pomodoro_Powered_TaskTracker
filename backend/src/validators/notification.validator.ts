import { z } from "zod";

export const createNotificationSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  type: z.enum(["workspace_invite", "task_assigned", "pomodoro_complete", "mention", "system"]),
  message: z.string().min(1, "Message is required").max(500),
  link: z.string().optional(),
});
