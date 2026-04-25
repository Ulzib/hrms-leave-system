import prisma from "../lib/prisma";
import asyncHandler from "../middleware/asyncHandler";
import { Request, Response } from "express";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, name, password, role } = req.body;

  const existUser = await prisma.user.findUnique({ where: { email } });
  if (existUser) {
    res.status(400).json({ message: "Бүртгэлтэй имэйл байна" });
    return;
  }
});
