import { z } from "zod";

export const createAiInteractionSchema = z.object({
  taskId: z.string().optional(),
  provider: z.enum(["openai", "anthropic", "google"]),
  action: z.enum(["rewrite_note", "summarize", "suggest_tasks", "chat"]),
  inputTokens: z.number().int().min(0).optional(),
  outputTokens: z.number().int().min(0).optional(),
});
