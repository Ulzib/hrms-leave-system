import { Router } from "express";

import { protect } from "../middleware/auth.middleware";
import { sendOtp, verifyOtp } from "../controllers/auth.controller";

const router = Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

router.get("/me", protect, (req, res) => {
  res.json({ user: req.user });
});

export default router;
