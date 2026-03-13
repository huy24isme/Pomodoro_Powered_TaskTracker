import { Request, Response } from "express";
import { asyncHandler } from "@utils/async-handler";
import { apiResponse } from "@utils/api-response";
import * as pomodoroService from "@services/pomodoro-session.service";

export const startSession = asyncHandler(
  async (req: Request, res: Response) => {
    const session = await pomodoroService.startSession(
      req.user!.id,
      req.body,
    );
    apiResponse({
      res,
      statusCode: 201,
      message: "Pomodoro session started",
      data: session,
    });
  },
);

export const updateSession = asyncHandler(
  async (req: Request, res: Response) => {
    const session = await pomodoroService.updateSession(
      req.params.id,
      req.user!.id,
      req.body.status,
    );
    apiResponse({ res, message: "Session updated", data: session });
  },
);

export const getSessions = asyncHandler(
  async (req: Request, res: Response) => {
    const { sessions, meta } = await pomodoroService.getSessionsByUser(
      req.user!.id,
      req.query as any,
    );
    apiResponse({ res, data: sessions, meta });
  },
);

export const getSessionById = asyncHandler(
  async (req: Request, res: Response) => {
    const session = await pomodoroService.getSessionById(
      req.params.id,
      req.user!.id,
    );
    apiResponse({ res, data: session });
  },
);
