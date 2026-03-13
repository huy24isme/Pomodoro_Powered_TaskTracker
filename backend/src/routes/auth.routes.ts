import { Router } from "express";
import { authenticate } from "@middlewares/auth.middleware";
import { validate } from "@middlewares/validate.middleware";
import { registerSchema, loginSchema, refreshTokenSchema } from "@validators/auth.validator";
import * as authController from "@controllers/auth.controller";

const router = Router();

router.post("/auth/register", validate({ body: registerSchema }), authController.register);
router.post("/auth/login", validate({ body: loginSchema }), authController.login);
router.post("/auth/refresh-token", validate({ body: refreshTokenSchema }), authController.refreshToken);
router.post("/auth/logout", authenticate, authController.logout);
router.get("/auth/me", authenticate, authController.getMe);

export default router;
