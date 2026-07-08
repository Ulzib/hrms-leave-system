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
    res.status(400).json({ message: "Энэ имэйл бүртгэлтгүй байна." });
    return;
  }
});
