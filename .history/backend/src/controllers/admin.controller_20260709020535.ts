import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { getMonthYear } from "../lib/adminStats.helper";
import prisma from "../lib/prisma";

export const getAllStaffs = asyncHandler(
  async (req: Request, res: Response) => {
    const { month, year } = getMonthYear(req);

    const staffs = await prisma.user.findMany({
      where: { role: { in: ["EMPLOYEE", "HR"] } },
      orderBy: { username: "asc" },
    });
  },
);
