import prisma from "../lib/prisma";
import asyncHandler from "../middleware/asyncHandler";
import { Request, Response } from "express";

export const createLeaveReq = asyncHandler(
  async (req: Request, res: Response) => {
    const { requestTypeId, startDate, endDate, reason } = req.body;
    const userId = (req as any).user.id;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );
    //undsen udur shalgh
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(401).json({ message: "Хэрэглэгч олдсонгүй" });
      return;
    }

    const remainingDays = user.totalDays - user.usedDays;
    if (days > remainingDays) {
      res.status(400).json({
        message: `Үлдсэн өдөр хүрэлцэхгүй байна. Үлдсэн: ${remainingDays} өдөр.`,
      });
      return;
    }

    const leaveReq = await prisma.leaveRequest.create({
      data: {
        userId,
        requestTypeId,
        startDate: start,
        endDate: end,
        days,
        reason,
      },
    });
    res.status(201).json({ messsage: "Хүсэлт амжилттай илгээгдлээ", leaveReq });
  },
);

//uuriin huseltuudiig harah
export const getMyLeaveReqs = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user.id;

    const 
  },
);
