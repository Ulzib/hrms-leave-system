import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";

export const getApprovedLeaves = asyncHandler(
  async (req: Request, res: Response) => {
    const { startDate, endDate } = req.query;

    //
  },
);
