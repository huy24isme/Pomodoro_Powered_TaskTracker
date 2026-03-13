import { Router } from "express";
import { authenticate } from "@middlewares/auth.middleware";
import * as activityLogController from "@controllers/activity-log.controller";

const router = Router();

router.use(authenticate);

router.get("/workspaces/:workspaceId/activity-logs", activityLogController.getActivityLogs);

export default router;
