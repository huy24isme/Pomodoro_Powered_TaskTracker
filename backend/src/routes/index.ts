import { Router } from "express";
import healthRoutes from "./health.routes";
import authRoutes from "./auth.routes";
import workspaceRoutes from "./workspace.routes";
import boardRoutes from "./board.routes";
import taskRoutes from "./task.routes";
import noteRoutes from "./note.routes";
import pomodoroSessionRoutes from "./pomodoro-session.routes";
import musicTrackRoutes from "./music-track.routes";
import invitationRoutes from "./invitation.routes";
import messageRoutes from "./message.routes";
import notificationRoutes from "./notification.routes";
import activityLogRoutes from "./activity-log.routes";
import aiInteractionRoutes from "./ai-interaction.routes";

const router = Router();

router.use(healthRoutes);
router.use(authRoutes);
router.use(workspaceRoutes);
router.use(boardRoutes);
router.use(taskRoutes);
router.use(noteRoutes);
router.use(pomodoroSessionRoutes);
router.use(musicTrackRoutes);
router.use(invitationRoutes);
router.use(messageRoutes);
router.use(notificationRoutes);
router.use(activityLogRoutes);
router.use(aiInteractionRoutes);

export default router;
