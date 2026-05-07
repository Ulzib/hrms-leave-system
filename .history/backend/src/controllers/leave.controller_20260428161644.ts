import prisma from "../lib/prisma";
import asyncHandler from "../middleware/asyncHandler";
import { Request, Response } from "express";

export const createLeaveReq = asyncHandler(
  async (req: Request, res: Response) => {
    const { requestTypeId, startDte };
  },
);
