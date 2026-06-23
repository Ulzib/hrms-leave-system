import { Request, Response } from "express";
import prisma from "../lib/prisma";
import asyncHandler from "../middleware/asyncHandler";

//admin, hr req zuvshuuruh, tatgalzah
//patch  /api/leave/:id/status
//body : {status: "APPROVED" | "REJECTED" , rejectReason?:string}
export const updateLeaveStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, rejectReason } = req.body;

    //huselt bga esehiig shalgana
    const leaveReq = await prisma.leaveRequest.findUnique({
      where: { id: Number(id) },
    });
    if (!leaveReq) {
      res.status(404).json({ message: "Хүcэлт олдсонгүй" });
      return;
    }

    //zuvhun pending huselt
    if (leaveReq.status !== "PENDING") {
      res.status(400).json({ message: "Шийдвэрлэгдсэн хүсэлт байна" });
      return;
    }

    //reject ued shaltgaan zaaval bn
    if (status === "REJECTED" && !rejectReason) {
      res.status(400).json({ message: "Татгалзах шалтгаанаа оруулна уу" });
      return;
    }

    const updated = await prisma.leaveRequest.update({
      where: { id: Number(id) },
      data: {
        status,
        rejectReason: status === "REJECTED" ? rejectReason : null, //status batlagdsn ued reject hoosn bn
      },
    });

    res.json({ message: "Амжилттай шинэчлэгдлээ", leaveReq: updated });
  },
);
