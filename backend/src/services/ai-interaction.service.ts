import { AiInteraction } from "@models/ai-interaction.model";
import { HttpError } from "@middlewares/error.middleware";
import { parsePagination, paginationMeta } from "@utils/pagination";

export const createInteraction = async (
  userId: string,
  data: {
    taskId?: string;
    provider: string;
    action: string;
    inputTokens?: number;
    outputTokens?: number;
  },
) => {
  return AiInteraction.create({ ...data, userId });
};

export const getInteractionsByUser = async (
  userId: string,
  query: { page?: string; limit?: string },
) => {
  const { skip, limit, page } = parsePagination(query);
  const [interactions, total] = await Promise.all([
    AiInteraction.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit),
    AiInteraction.countDocuments({ userId }),
  ]);
  return { interactions, meta: paginationMeta(page, limit, total) };
};

export const getInteractionById = async (id: string, userId: string) => {
  const interaction = await AiInteraction.findOne({ _id: id, userId });
  if (!interaction) {
    throw new HttpError("AI interaction not found", 404);
  }
  return interaction;
};
