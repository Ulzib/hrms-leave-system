import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";

// - startDate, endDate query param-r shuuj blno (yyyy-mm-dd)

export const getApprovedLeaves = asyncHandler(
  async (req: Request, res: Response) => {
    const { startDate, endDate } = req.query;

    //prisma where nuhtsul ehendee approved shuune
    const whereCondition: {
      status: string;
      startDate?: { gte?: Date; lte?: Date };
    } = {
      status,
    };
  },
);
