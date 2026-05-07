import bcrypt from "bcryptjs";
import prisma from "../lib/prisma";
import asyncHandler from "../middleware/asyncHandler";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const sendOtp = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  //zuvhun admin burgesen mail-eer login hiine
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(400).json({ message: "Бүртгэлгүй имэйл байна" });
    return;
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.user.update({
    where: { email },
    data: { otp, otpExpiry },
  });

  //mail ilgeeh
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transport.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Нэвтрэх нэг удаагийн код",
    text: `Таны нэвтрэх код: ${otp}\n\nкод 10 минутын дараа хүчингүй болно.`,
  });

  res.json({ message: "Код имэйл рүү илгээгдлээ" });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    res.status(400).json({ message: "Имэйл эсвэл нууц үг буруу байна" });
    return;
  }

  const passMatch = await bcrypt.compare(password, user.password);

  if (!passMatch) {
    res.status(400).json({ message: "Имэйл эсвэл нууц үг буруу байна" });
  }

  //token uusgeh
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" },
  );

  res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
});
