import { Request, Response } from "express";
import { asyncHandler } from "@utils/async-handler";
import { apiResponse } from "@utils/api-response";
import * as aiInteractionService from "@services/ai-interaction.service";

export const createInteraction = asyncHandler(
  async (req: Request, res: Response) => {
    const interaction = await aiInteractionService.createInteraction(
      req.user!.id,
      req.body,
    );
    apiResponse({
      res,
      statusCode: 201,
      message: "AI interaction logged",
      data: interaction,
    });
  },
);

export const getInteractions = asyncHandler(
  async (req: Request, res: Response) => {
    const { interactions, meta } =
      await aiInteractionService.getInteractionsByUser(
        req.user!.id,
        req.query as any,
      );
    apiResponse({ res, data: interactions, meta });
  },
);

export const getInteractionById = asyncHandler(
  async (req: Request, res: Response) => {
    const interaction = await aiInteractionService.getInteractionById(
      req.params.id,
      req.user!.id,
    );
    apiResponse({ res, data: interaction });
  },
);
