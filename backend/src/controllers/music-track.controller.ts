import { Request, Response } from "express";
import { asyncHandler } from "@utils/async-handler";
import { apiResponse } from "@utils/api-response";
import * as musicTrackService from "@services/music-track.service";

export const createTrack = asyncHandler(
  async (req: Request, res: Response) => {
    const track = await musicTrackService.createTrack(req.user!.id, req.body);
    apiResponse({
      res,
      statusCode: 201,
      message: "Music track created",
      data: track,
    });
  },
);

export const getTracks = asyncHandler(
  async (req: Request, res: Response) => {
    const tracks = await musicTrackService.getTracksByUser(req.user!.id);
    apiResponse({ res, data: tracks });
  },
);

export const getTrackById = asyncHandler(
  async (req: Request, res: Response) => {
    const track = await musicTrackService.getTrackById(
      req.params.id,
      req.user!.id,
    );
    apiResponse({ res, data: track });
  },
);

export const updateTrack = asyncHandler(
  async (req: Request, res: Response) => {
    const track = await musicTrackService.updateTrack(
      req.params.id,
      req.user!.id,
      req.body,
    );
    apiResponse({ res, message: "Track updated", data: track });
  },
);

export const deleteTrack = asyncHandler(
  async (req: Request, res: Response) => {
    await musicTrackService.deleteTrack(req.params.id, req.user!.id);
    apiResponse({ res, message: "Track deleted" });
  },
);
