import request from "supertest";
import jwt from "jsonwebtoken";

jest.mock("../src/lib/prisma");

import app from "../src/app";
import prisma from "../src/lib/prisma";

const employeeToken = jwt.sign(
  { id: 1, role: "EMPLOYEE" },
  process.env.JWT_SECRET as string,
);

const validBody = {
  requestTypeId: 1,
  managerId: 2,
  startDate: "2026-08-01",
  endDate: "2026-08-03",
  reason: "амарна",
};

describe("POST /api/leave", () => {
  it("login болоогүй бол 401 буцна", async () => {
    const res = await request(app).post("/api/leave").send(validBody);

    expect(res.status).toBe(401);
  });

  it("req type олдохгүй бол 404 буцна", async () => {
    (prisma.requestType.findUnique as jest.Mock).mockResolvedValue(null);

    const res = await request(app)
      .post("/api/leave")
      .set("Authorization", "Bearer " + employeeToken)
      .send(validBody);

    expect(res.status).toBe(404);
  });

  it("manager олдохгүй бол 400 буцна", async () => {
    (prisma.requestType.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      limit: 5,
      period: "YEARLY",
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const res = await request(app)
      .post("/api/leave")
      .set("Authorization", "Bearer " + employeeToken)
      .send(validBody);

    expect(res.status).toBe(400);
  });

  it("manager эрх employee бол 400 буцна", async () => {
    (prisma.requestType.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      limit: 5,
      period: "YEARLY",
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 2,
      role: "EMPLOYEE",
    });

    const res = await request(app)
      .post("/api/leave")
      .set("Authorization", "Bearer " + employeeToken)
      .send(validBody);

    expect(res.status).toBe(400);
  });

  it("үлдсэн өдөр хүрэлцгүй бол 400 буцна", async () => {
    (prisma.requestType.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      limit: 2,
      period: "YEARLY",
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 2,
      role: "HR",
    });
    (prisma.leaveRequest.aggregate as jest.Mock).mockResolvedValue({
      _sum: { days: 1 },
    });

    const res = await request(app)
      .post("/api/leave")
      .set("Authorization", "Bearer " + employeeToken)
      .send(validBody);

    expect(res.status).toBe(400);
  });

  it("зөв бол хүсэлт үүсгэж 201 буцаана", async () => {
    (prisma.requestType.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      limit: 10,
      period: "YEARLY",
    });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 2,
      role: "HR",
    });
    (prisma.leaveRequest.aggregate as jest.Mock).mockResolvedValue({
      _sum: { days: 0 },
    });
    (prisma.leaveRequest.create as jest.Mock).mockResolvedValue({
      id: 5,
    });

    const res = await request(app)
      .post("/api/leave")
      .set("Authorization", "Bearer " + employeeToken)
      .send(validBody);

    expect(res.status).toBe(201);
    expect(prisma.leaveRequest.create).toHaveBeenCalled();
  });
});
