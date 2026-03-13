import { z } from "zod";

export const createNoteSchema = z.object({
  content: z.string().min(1, "Content is required").max(10000),
});

export const updateNoteSchema = z.object({
  content: z.string().min(1).max(10000).optional(),
  isPinned: z.boolean().optional(),
});
