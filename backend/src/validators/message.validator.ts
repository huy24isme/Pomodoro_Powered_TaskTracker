import { z } from "zod";

export const createMessageSchema = z.object({
  content: z.string().min(1, "Content is required").max(5000),
  replyTo: z.string().optional(),
  attachments: z.array(z.string()).optional(),
});

export const updateMessageSchema = z.object({
  content: z.string().min(1).max(5000),
});
