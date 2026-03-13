import { Router } from "express";
import { authenticate } from "@middlewares/auth.middleware";
import { validate } from "@middlewares/validate.middleware";
import { createBoardSchema, updateBoardSchema } from "@validators/board.validator";
import * as boardController from "@controllers/board.controller";

const router = Router();

router.use(authenticate);

router.post("/workspaces/:workspaceId/boards", validate({ body: createBoardSchema }), boardController.createBoard);
router.get("/workspaces/:workspaceId/boards", boardController.getBoardsByWorkspace);
router.get("/boards/:id", boardController.getBoardById);
router.patch("/boards/:id", validate({ body: updateBoardSchema }), boardController.updateBoard);
router.delete("/boards/:id", boardController.deleteBoard);

export default router;
