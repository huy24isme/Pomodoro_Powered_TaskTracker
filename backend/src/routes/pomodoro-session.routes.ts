import { Router } from "express";
import { authenticate } from "@middlewares/auth.middleware";
import { validate } from "@middlewares/validate.middleware";
import {
  createPomodoroSessionSchema,
  updatePomodoroSessionSchema,
} from "@validators/pomodoro-session.validator";
import * as pomodoroController from "@controllers/pomodoro-session.controller";

const router = Router();

router.use(authenticate);

router.post("/pomodoro-sessions", validate({ body: createPomodoroSessionSchema }), pomodoroController.startSession);
router.get("/pomodoro-sessions", pomodoroController.getSessions);
router.get("/pomodoro-sessions/:id", pomodoroController.getSessionById);
router.patch("/pomodoro-sessions/:id", validate({ body: updatePomodoroSessionSchema }), pomodoroController.updateSession);

export default router;
