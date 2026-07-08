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
    }
  },
);
