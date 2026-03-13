import { Router } from "express";
import { authenticate } from "@middlewares/auth.middleware";
import * as notificationController from "@controllers/notification.controller";

const router = Router();

router.use(authenticate);

router.get("/notifications", notificationController.getNotifications);
router.patch("/notifications/read-all", notificationController.markAllRead);
router.patch("/notifications/:id/read", notificationController.markRead);
router.delete("/notifications/:id", notificationController.deleteNotification);

export default router;
