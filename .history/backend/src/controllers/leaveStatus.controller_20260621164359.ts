import { Request, Response } from "express";
import prisma from "../lib/prisma";
import asyncHandler from "../middleware/asyncHandler";

//admin, hr req zuvshuuruh, tatgalzah
//patch  /api/leave/:id/status
//body : {status: "APPROVED" | "REJECTED" , rejectReason?:string}
export const updateLeaveStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    const leaveReq = await prisma.leaveRequest.findUnique({
      where: { id: Number(id) },
    });
    if (!leaveReq) {
      res.status(404).json({ message: "Хүcэлт олдсонгүй" });
      return;
    }

    if (leaveReq.status !== "PENDING") {
      res.status(400).json({ message: "Шийдвэрлэгдсэн хүсэлт байна" });
      return;
    }

    const updated = await prisma.leaveRequest.update({
      where: { id: Number(id) },
      data: { status },
    });

    res.json({ message: "Амжилттай шинэчлэгдлээ", leaveReq: updated });
  },
);
