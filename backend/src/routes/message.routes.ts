import { Router } from "express";
import { authenticate } from "@middlewares/auth.middleware";
import { validate } from "@middlewares/validate.middleware";
import { createMessageSchema, updateMessageSchema } from "@validators/message.validator";
import * as messageController from "@controllers/message.controller";

const router = Router();

router.use(authenticate);

router.post("/workspaces/:workspaceId/messages", validate({ body: createMessageSchema }), messageController.sendMessage);
router.get("/workspaces/:workspaceId/messages", messageController.getMessages);
router.patch("/messages/:id", validate({ body: updateMessageSchema }), messageController.updateMessage);
router.delete("/messages/:id", messageController.deleteMessage);

export default router;
