import prisma from "../lib/prisma";
import asyncHandler from "../middleware/asyncHandler";
import { Request, Response } from "express";

// Ажилтан хүсэлт илгээх
export const createLeave = asyncHandler(async (req: Request, res: Response) => {
  const { requestTypeId, startDate, endDate, reason } = req.body;
  const userId = (req as any).user.id;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const days =
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  // Үлдсэн өдөр шалгах
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
    return;
  }

  const remaining = user.totalDays - user.usedDays;
  if (days > remaining) {
    res
      .status(400)
      .json({
        message: `Үлдсэн өдөр хүрэлцэхгүй байна. Үлдсэн: ${remaining} өдөр`,
      });
    return;
  }

  const leave = await prisma.leaveRequest.create({
    data: {
      userId,
      requestTypeId,
      startDate: start,
      endDate: end,
      days,
      reason,
    },
  });

  res.status(201).json({ message: "Хүсэлт амжилттай илгээгдлээ", leave });
});

// Өөрийн хүсэлтүүдийг харах
export const getMyLeaves = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  const leaves = await prisma.leaveRequest.findMany({
    where: { userId },
    include: { requestType: true },
    orderBy: { createdAt: "desc" },
  });

  res.json(leaves);
});

// ADMIN/HR: бүх хүсэлтийг харах
export const getAllLeaves = asyncHandler(
  async (req: Request, res: Response) => {
    const leaves = await prisma.leaveRequest.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        requestType: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(leaves);
  },
);

// ADMIN/HR: хүсэлт зөвшөөрөх / татгалзах
export const updateLeaveStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body; // "APPROVED" | "REJECTED"

    const leave = await prisma.leaveRequest.findUnique({
      where: { id: Number(id) },
    });
    if (!leave) {
      res.status(404).json({ message: "Хүсэлт олдсонгүй" });
      return;
    }

    if (leave.status !== "PENDING") {
      res
        .status(400)
        .json({ message: "Аль хэдийн шийдвэрлэгдсэн хүсэлт байна" });
      return;
    }

    const updated = await prisma.leaveRequest.update({
      where: { id: Number(id) },
      data: { status },
    });

    // Зөвшөөрсөн бол usedDays нэмэх
    if (status === "APPROVED") {
      await prisma.user.update({
        where: { id: leave.userId },
        data: { usedDays: { increment: leave.days } },
      });
    }

    res.json({ message: "Амжилттай шинэчлэгдлээ", leave: updated });
  },
);

// ADMIN: чөлөөний төрөл үүсгэх
export const createRequestType = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, limit, period } = req.body;

    const requestType = await prisma.requestType.create({
      data: { name, limit, period },
    });

    res.status(201).json({ message: "Чөлөөний төрөл үүслээ", requestType });
  },
);

// Чөлөөний төрлүүдийг харах
export const getRequestTypes = asyncHandler(
  async (req: Request, res: Response) => {
    const types = await prisma.requestType.findMany();
    res.json(types);
  },
);
