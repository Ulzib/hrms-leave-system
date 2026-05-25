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

//hr,admin hereglegchdiin jagsaalt - hyanagch songohd ashiglana
router.get("/managers", protect, async (req, res) => {
  const managers = await prisma.user.findMany({
    where: { role: { in: ["HR", "ADMIN"] } },
    select: { id: true, username: true, role: true },
  });
});

router.get("/balance", protect, async (req, res) => {
  const userId = req.user!.id;

  const types = await prisma.requestType.findMany();

  const balance = await Promise.all(
    types.map(async (type) => {
      const now = new Date();
      //sar, jiliin ehnees tootsoh
      const dateFilter =
        type.period === "MONTHLY"
          ? new Date(now.getFullYear(), now.getMonth(), 1)
          : new Date(now.getFullYear(), 0, 1);

      const usedDays = await prisma.leaveRequest.aggregate({
        where: {
          userId,
          requestTypeId: type.id,
          status: "APPROVED",
          createdAt: { gte: dateFilter }, //hugatsaani fillter
        },
        _sum: { days: true },
      });
      return {
        name: type.name,
        limit: type.limit,
        used: usedDays._sum.days ?? 0,
        remaining: type.limit - (usedDays._sum.days ?? 0),
      };
    }),
  );
  res.json(balance);
});

router.post("/", protect, createLeaveReq);
router.get("/my-request", protect, getMyLeaveReqs);
router.get("/all-requests", protect, authorize("ADMIN", "HR"), getAllLeaveReqs);
router.patch(
  "/:id/status",
  protect,
  authorize("ADMIN", "HR"),
  updateLeaveStatus,
);

export default router;
