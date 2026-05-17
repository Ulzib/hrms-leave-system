import { Router } from "express";
import { authorize, protect } from "../middleware/auth.middleware";
import {
  createLeaveReq,
  createRequestType,
  getAllLeaveReqs,
  getMyLeaveReqs,
  getRequestTypes,
  updateLeaveStatus,
} from "../controllers/leave.controller";
import prisma from "../lib/prisma";

const router = Router();

router.get("/types", protect, getRequestTypes);
router.post("/types", protect, authorize("ADMIN"), createRequestType);

router.post("/", protect, createLeaveReq);
router.get("/my-request", protect, getMyLeaveReqs);
router.get("/all-requests", protect, authorize("ADMIN", "HR"), getAllLeaveReqs);
router.patch(
  "/:id/status",
  protect,
  authorize("ADMIN", "HR"),
  updateLeaveStatus,
);

router.get("/balance", protect, async (req, res) => {
  const userId = req.user!.id;

  const types = await prisma.requestType.findMany();

  const balance = await Promise.all(
    types.map(async (type) => {
      const usedDays = await prisma.leaveRequest.aggregate({
        where: { userId, requestTypeId: type.id, status: "APPROVED" },
        _sum: { days: true },
      });
    }),
  );
  res.json(balance)
});

export default router;
