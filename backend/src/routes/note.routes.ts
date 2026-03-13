import { Router } from "express";
import { authenticate } from "@middlewares/auth.middleware";
import { validate } from "@middlewares/validate.middleware";
import { createNoteSchema, updateNoteSchema } from "@validators/note.validator";
import * as noteController from "@controllers/note.controller";

const router = Router();

router.use(authenticate);

router.post("/tasks/:taskId/notes", validate({ body: createNoteSchema }), noteController.createNote);
router.get("/tasks/:taskId/notes", noteController.getNotesByTask);
router.patch("/notes/:id", validate({ body: updateNoteSchema }), noteController.updateNote);
router.delete("/notes/:id", noteController.deleteNote);

export default router;
