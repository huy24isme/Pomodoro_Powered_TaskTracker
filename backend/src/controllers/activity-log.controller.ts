import { Request, Response } from "express";
import { asyncHandler } from "@utils/async-handler";
import { apiResponse } from "@utils/api-response";
import * as activityLogService from "@services/activity-log.service";

export const getActivityLogs = asyncHandler(
  async (req: Request, res: Response) => {
    const { logs, meta } = await activityLogService.getActivityLogs(
      req.params.workspaceId,
      req.user!.id,
      req.query as any,
    );
    apiResponse({ res, data: logs, meta });
  },
);
