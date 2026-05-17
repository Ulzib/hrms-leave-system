import { Router } from "express";

import { protect } from "../middleware/auth.middleware";
import { sendOtp, verifyOtp } from "../controllers/auth.controller";
import prisma from "../lib/prisma";

const router = Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

router.get("/me", protect, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    select: {
      id: true,
      username: true,
      role: true,
      totalDays: true,
      usedDays: true,
    },
  });
  res.json({ user });
});

export default router;
