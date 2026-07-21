import { Role } from "@prisma/client";
import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import {
  getMonthYear,
  sumDaysForMonth,
  sumDaysForYear,
} from "../lib/adminStats.helper";
import prisma from "../lib/prisma";

export const getAllStaffs = asyncHandler(
  async (req: Request, res: Response) => {
    const { month, year } = getMonthYear(req);

    const showAll = req.query.showAll === "true";

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);

    const where: {
      role: { in: string[] };
      hiredAt?: { gte: Date; lt: Date };
    } = {
      role: { in: ["EMPLOYEE", "HR"] },
    };

    if (!showAll) {
      where.hiredAt = { gte: start, lt: end };
    }

    const employees = await prisma.user.findMany({
      where: { role: { in: ["EMPLOYEE", "HR"] } },
      orderBy: { username: "asc" },
    });

    const rows = [];

    for (let i = 0; i < employees.length; i++) {
      const staff = employees[i];

      const leaveDays = await sumDaysForMonth(staff.id, "Чөлөө", month, year);
      const remoteDays = await sumDaysForMonth(
        staff.id,
        "Зайнаас ажиллах",
        month,
        year,
      );
      const paidLeaveDays = await sumDaysForYear(
        staff.id,
        "Цалинтай чөлөө",
        year,
      );

      rows.push({
        id: staff.id,
        username: staff.username,
        position: staff.position,
        email: staff.email,
        hiredAt: staff.hiredAt,
        role: staff.role,
        leaveDays,
        remoteDays,
        paidLeaveDays,
      });
    }
    res.json(rows);
  },
);

//admin shine ajiltan burtgeh
export const createStaff = asyncHandler(async (req: Request, res: Response) => {
  const { username, position, email, hiredAt, role } = req.body;

  const existing = await prisma.user.findUnique({
    where: { email },
  });
  if (existing) {
    res.status(400).json({ message: "Энэ имэйл бүртгэлтэй байна." });
    return;
  }

  let newRole: Role = "EMPLOYEE";
  if (role === "HR") {
    newRole = "HR";
  }

  const staff = await prisma.user.create({
    data: {
      username,
      position,
      email,
      hiredAt: new Date(hiredAt),
      role: newRole,
    },
  });
  res.status(201).json({ message: "Ажилтан амжилттай бүртгэгдлээ", staff });
});

//admin - ajiltniig promote hiih
export const promoteToHr = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const staff = await prisma.user.findUnique({ where: { id } });

  if (!staff) {
    res.status(404).json({ message: "Ажилтан олдсонгүй" });
    return;
  }

  const updated = await prisma.user.update({
    where: { id },
    data: { role: "HR" },
  });

  res.json({ message: "Ажилтныг ахлах ажилтан болголоо", staff: updated });
});
