import bcrypt from "bcryptjs";
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

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashPassword, name, role },
  });

  res.status(201).json({ message: "Амжилттай бүртгэлээ", userId: user.id });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    res.status(400).json({ message: "Имэйл эсвэл нууц үг буруу байна" });
    return;
  }

  const passMatch = await bcrypt.compare(password, has);
});
