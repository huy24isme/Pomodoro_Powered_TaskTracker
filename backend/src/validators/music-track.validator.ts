import { z } from "zod";

export const createMusicTrackSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  fileUrl: z.string().url("Invalid file URL"),
  fileSize: z.number().int().positive().optional(),
  mode: z.enum(["focus", "break", "ambient"]).optional().default("focus"),
  durationSec: z.number().int().positive().optional(),
});

export const updateMusicTrackSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  mode: z.enum(["focus", "break", "ambient"]).optional(),
});
