import { Router } from "express";
import { authenticate } from "@middlewares/auth.middleware";
import { validate } from "@middlewares/validate.middleware";
import { createInvitationSchema, respondInvitationSchema } from "@validators/invitation.validator";
import * as invitationController from "@controllers/invitation.controller";

const router = Router();

router.use(authenticate);

router.post("/workspaces/:workspaceId/invitations", validate({ body: createInvitationSchema }), invitationController.createInvitation);
router.get("/workspaces/:workspaceId/invitations", invitationController.getInvitations);
router.patch("/invitations/:id/respond", validate({ body: respondInvitationSchema }), invitationController.respondToInvitation);

export default router;
