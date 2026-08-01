import request from "supertest";
import jwt from "jsonwebtoken";

jest.mock("../src/lib/prisma");

import app from "../src/app";
import prisma from "../src/lib/prisma";

const employeeToken = jwt.sign(
  { id: 1, role: "EMPLOYEE" },
  process.env.JWT_SECRET as string,
);

const hrToken = jwt.sign(
  { id: 2, role: "HR" },
  process.env.JWT_SECRET as string,
);

describe("GET / api/leave/my-request", () => {
  it("login user-ийн хүсэлтүүдийг буцаана", async () => {
    (prisma.leaveRequest.findMany as jest.Mock).mockResolvedValue([
      { id: 1, userId: 2 },
    ]);

    const res = await request(app)
      .get("/api/leave/my-request")
      .set("Authorization", "Bearer " + employeeToken);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });
});

describe("GET /api/leave/all-requests", () => {
  it("employee эрхтэй бол 403 буцна", async () => {
    const res = await request(app)
      .get("/api/leave/all-requests")
      .set("Authorization", "Bearer " + employeeToken);

    expect(res.status).toBe(403);
  });

  it("hr эрхтэй бол бүх хүсэлтийг буцаана", async () => {
    (prisma.leaveRequest.findMany as jest.Mock).mockResolvedValue([
      { id: 1 },
      { id: 2 },
    ]);

    const res = await request(app)
      .get("/api/leave/all-requests")
      .set("Authorization", "Bear " + hrToken);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });
});

describe("POST /api/leave/types", () => {
  it("admin биш бол 403 буцна", async () => {
    const res = await request(app)
      .post("/api/leave/types")
      .set("Authorization", "Bearer " + hrToken)
      .send({ name: "Чөлөө", limit: 10, period: "YEARLY" });

    expect(res.status).toBe(403);
  });
});
