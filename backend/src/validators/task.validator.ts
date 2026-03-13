import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(5000).optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional().default("medium"),
  position: z.number().int().min(0).optional(),
  assignees: z.array(z.string()).optional(),
  labels: z.array(z.string()).optional(),
  dueDate: z.string().datetime().optional(),
  pomodoroEstimate: z.number().int().min(1).optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(5000).optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
  position: z.number().int().min(0).optional(),
  assignees: z.array(z.string()).optional(),
  labels: z.array(z.string()).optional(),
  dueDate: z.string().datetime().nullable().optional(),
  pomodoroEstimate: z.number().int().min(1).nullable().optional(),
  isArchived: z.boolean().optional(),
});

export const moveTaskSchema = z.object({
  boardId: z.string().min(1, "Board ID is required"),
  position: z.number().int().min(0),
});
