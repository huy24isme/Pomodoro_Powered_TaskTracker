import { z } from "zod";

export const createBoardSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  position: z.number().int().min(0).optional(),
  color: z.string().max(20).optional(),
  type: z.enum(["kanban", "list", "calendar"]).optional().default("kanban"),
});

export const updateBoardSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  position: z.number().int().min(0).optional(),
  color: z.string().max(20).optional(),
  type: z.enum(["kanban", "list", "calendar"]).optional(),
  isArchived: z.boolean().optional(),
});
