import prisma from "../lib/prisma";
import asyncHandler from "../middleware/asyncHandler";
import { Request, Response } from "express";

export const createLeaveReq = asyncHandler(
  async (req: Request, res: Response) => {
    const { requestTypeId, managerId, startDate, endDate, reason } = req.body;
    const userId = req.user!.id;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );
    //requestType-s limit avah
    const requestType = await prisma.requestType.findUnique({
      where: { id: requestTypeId },
    });
    if (!requestType) {
      res.status(404).json({ message: "Чөлөөний төрөл олдсонгүй" });
      return;
    }
    //manager id shalgah
    const manager = await prisma.user.findUnique({
      where: { id: managerId },
    });
    if (!manager || !["HR", "ADMIN"].includes(manager.role)) {
      res
        .status(400)
        .json({ message: "Хянагч олдсонгүй эсвэл эрх хүрэлцэхгүй байна" });
    }

    //period-s hamaaran sariin, jiliin ehnees tootsno
    const now = new Date();
    const dateFilter =
      requestType?.period === "MONTHLY"
        ? new Date(now.getFullYear(), now.getMonth(), 1)
        : new Date(now.getFullYear(), 0, 1);

    //ali hediin ashiglasn udruudiig tootsno
    const usedResult = await prisma.leaveRequest.aggregate({
      where: {
        userId,
        requestTypeId,
        status: "APPROVED",
        createdAt: { gte: dateFilter },
      },
      _sum: { days: true },
    });

    const used = usedResult._sum.days ?? 0;
    const remainingDays = requestType.limit - used;

    if (days > remainingDays) {
      res.status(400).json({
        message: `Үлдсэн өдөр хүрэлцэхгүй байна. Үлдсэн: ${remainingDays} өдөр.`,
      });
      return;
    }

    const leaveReq = await prisma.leaveRequest.create({
      data: {
        userId,
        managerId,
        requestTypeId,
        startDate: start,
        endDate: end,
        days,
        reason,
      },
    });
    res.status(201).json({ message: "Хүсэлт амжилттай илгээгдлээ", leaveReq });
  },
);

//uuriin huseltuudiig harah
export const getMyLeaveReqs = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const leaves = await prisma.leaveRequest.findMany({
      where: { userId },
      include: { requestType: true },
      orderBy: { createdAt: "desc" },
    });

    res.json(leaves);
  },
);

//admin/hr buh huseltuudig harah
export const getAllLeaveReqs = asyncHandler(
  async (req: Request, res: Response) => {
    const leaveReqs = await prisma.leaveRequest.findMany({
      include: {
        user: { select: { id: true, username: true, email: true } },
        requestType: true,
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(leaveReqs);
  },
);

//admin chuluunii turul uusgeh
export const createRequestType = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, limit, period } = req.body;

    const requestType = await prisma.requestType.create({
      data: { name, limit, period },
    });
    res.status(201).json({ message: "Чөлөөний төрөл үүслээ", requestType });
  },
);

//chuluunii turluud harah
export const getRequestTypes = asyncHandler(
  async (req: Request, res: Response) => {
    const types = await prisma.requestType.findMany();
    res.json(types);
  },
);
