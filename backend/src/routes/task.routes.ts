import { Router } from "express";
import { authenticate } from "@middlewares/auth.middleware";
import { validate } from "@middlewares/validate.middleware";
import { createTaskSchema, updateTaskSchema, moveTaskSchema } from "@validators/task.validator";
import * as taskController from "@controllers/task.controller";

const router = Router();

router.use(authenticate);

router.post("/boards/:boardId/tasks", validate({ body: createTaskSchema }), taskController.createTask);
router.get("/boards/:boardId/tasks", taskController.getTasksByBoard);
router.get("/tasks/:id", taskController.getTaskById);
router.patch("/tasks/:id", validate({ body: updateTaskSchema }), taskController.updateTask);
router.patch("/tasks/:id/move", validate({ body: moveTaskSchema }), taskController.moveTask);
router.delete("/tasks/:id", taskController.deleteTask);

export default router;
