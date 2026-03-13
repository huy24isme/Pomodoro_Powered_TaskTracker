import { Router } from "express";
import { authenticate } from "@middlewares/auth.middleware";
import { validate } from "@middlewares/validate.middleware";
import { createMusicTrackSchema, updateMusicTrackSchema } from "@validators/music-track.validator";
import * as musicTrackController from "@controllers/music-track.controller";

const router = Router();

router.use(authenticate);

router.post("/music-tracks", validate({ body: createMusicTrackSchema }), musicTrackController.createTrack);
router.get("/music-tracks", musicTrackController.getTracks);
router.get("/music-tracks/:id", musicTrackController.getTrackById);
router.patch("/music-tracks/:id", validate({ body: updateMusicTrackSchema }), musicTrackController.updateTrack);
router.delete("/music-tracks/:id", musicTrackController.deleteTrack);

export default router;
