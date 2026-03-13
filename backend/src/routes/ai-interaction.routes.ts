import { Router } from "express";
import { authenticate } from "@middlewares/auth.middleware";
import { validate } from "@middlewares/validate.middleware";
import { createAiInteractionSchema } from "@validators/ai-interaction.validator";
import * as aiInteractionController from "@controllers/ai-interaction.controller";

const router = Router();

router.use(authenticate);

router.post("/ai-interactions", validate({ body: createAiInteractionSchema }), aiInteractionController.createInteraction);
router.get("/ai-interactions", aiInteractionController.getInteractions);
router.get("/ai-interactions/:id", aiInteractionController.getInteractionById);

export default router;
