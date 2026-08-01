import request from "supertest";
import jwt from "jsonwebtoken";

jest.mock("../src/lib/prisma");
jest.mock("nodemailer");

import app from "../src/app";
import prisma from "../src/lib/prisma";
import nodemailer from "nodemailer";

//mail ilgeeh duuraimal func
const mockSendMail = jest.fn().mockResolvedValue(true);
(nodemailer.createTransport as jest.Mock) = jest.fn().mockReturnValue({
  sendMail: mockSendMail,
});

describe("POST /api/auth/send-otp", () => {
  it("Бүртгэлгүй имэйл бол 400 буцна", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const res = await request(app)
      .post("/api/auth/send-otp")
      .send({ email: "test@gmail.com" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Бүртгэлгүй имэйл байна");
  });

  it("Бүртгэлтэй имэйл бол otp үүсгээд мэйл илгээх", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      email: "user@gmail.com",
    });
    (prisma.user.update as jest.Mock).mockResolvedValue({});

    const res = await request(app)
      .post("/api/auth/send-otp")
      .send({ email: "user@gmail.com" });

    expect(res.status).toBe(200);
    expect(prisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { email: "user@gmail.com" } }),
    );
    expect(mockSendMail).toHaveBeenCalled();
  });
});

describe("POST /api/auth/verify-otp", () => {
  it("Бүртгэлгүй имэйл бол 404 буцна", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const res = await request(app)
      .post("/api/auth/verify-otp")
      .send({ email: "test@gmail.com", otp: "1234" });

    expect(res.status).toBe(404);
  });

  it("opt илгээгдээгүй бол 400 буцна", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      email: "user@gmail.com",
      otp: null,
      otpExpiry: null,
    });

    const res = await request(app)
      .post("/api/auth/verify-otp")
      .send({ email: "user@gmail.com" });

    expect(res.status).toBe(400);
  });

  it("otp буруу бол token олгохгүй", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      email: "user@gmail.com",
      otp: "1234",
      otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
    });

    const res = await request(app)
      .post("/api/auth/verify-otp")
      .send({ email: "user@gmail.com", otp: "9999" });

    expect(res.status).toBe(400);
    expect(res.body.token).toBeUndefined();
  });

  it("otp хугацаа дууссан бол token-гүй", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      email: "user@gmail.com",
      opt: "1234",
      otpExpiry: new Date(Date.now() - 60 * 1000),
    });

    const res = await request(app)
      .post("/api/auth/verify-otp")
      .send({ email: "user@gmail.com", otp: "1234" });

    expect(res.status).toBe(400);
    expect(res.body.token).toBeUndefined();
  });

  it("otp зөв бол token, user-н мэдээлэл буцаана", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      username: "Alex",
      role: "EMPLOYEE",
      email: "user@gmail.com",
      otp: "1234",
      otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
    });
    (prisma.user.update as jest.Mock).mockResolvedValue({});

    const res = await request(app).post("/api/auth/verify-otp").send({
      email: "user@gmial.com",
      otp: "1234",
    });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user).toEqual({
      id: 1,
      username: "Alex",
      role: "EMPLOYEE",
    });
  });
});

describe("GET /api/auth/me", () => {
  it("token байхгүй бол 401 буцна", async () => {
    const res = await request(app).get("/api/auth/me");
    expect(res.status).toBe(401);
  });

  it("token зөв бол user-н мэдээлэл буцна", async () => {
    const token = jwt.sign(
      { id: 1, role: "EMPLOYEE" },
      process.env.JWT_SECRET as string,
    );

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      username: "Alex",
      role: "EMPLOYEE",
    });

    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.user.username).toBe("Alex");
  });
});
