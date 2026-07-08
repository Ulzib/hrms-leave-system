import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";

export const getAllStaffs = asyncHandler(
  async (req: Request, res: Response) => {
    const { month, year } = getMonth;
  },
);
