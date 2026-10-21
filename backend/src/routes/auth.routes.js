import { Router } from "express";
import { googleAuth, googleCallback, logout, getMe, getRegistrationData, completeRegistration, login, register } from "../controllers/auth.controllers.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();
router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);
router.post("/login", login);
router.post("/register", register);
router.get("/registration-data", getRegistrationData);
router.post("/complete-registration", completeRegistration);
router.get("/me", requireAuth, getMe);
router.post("/logout", logout);

export default router;

