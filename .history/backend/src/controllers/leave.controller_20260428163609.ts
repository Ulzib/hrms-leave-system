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
  },
);
