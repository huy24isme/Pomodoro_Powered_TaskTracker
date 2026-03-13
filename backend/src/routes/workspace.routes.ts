import { Router } from "express";
import { authenticate } from "@middlewares/auth.middleware";
import { validate } from "@middlewares/validate.middleware";
import {
  createWorkspaceSchema,
  updateWorkspaceSchema,
  addMemberSchema,
} from "@validators/workspace.validator";
import * as workspaceController from "@controllers/workspace.controller";

const router = Router();

router.use(authenticate);

router.post("/workspaces", validate({ body: createWorkspaceSchema }), workspaceController.createWorkspace);
router.get("/workspaces", workspaceController.getWorkspaces);
router.get("/workspaces/:id", workspaceController.getWorkspaceById);
router.patch("/workspaces/:id", validate({ body: updateWorkspaceSchema }), workspaceController.updateWorkspace);
router.delete("/workspaces/:id", workspaceController.deleteWorkspace);
router.post("/workspaces/:id/members", validate({ body: addMemberSchema }), workspaceController.addMember);
router.delete("/workspaces/:id/members/:userId", workspaceController.removeMember);

export default router;
