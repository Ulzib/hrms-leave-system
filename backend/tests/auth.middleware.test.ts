import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { authorize, protect } from "../src/middleware/auth.middleware";

function mockReqRes(headers: Record<string, string> = {}) {
  const req = { headers } as unknown as Request;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;
  const next = jest.fn() as NextFunction;
  return { req, res, next };
}

describe("protect", () => {
  it("token байхгүй бол 401 butsaana", () => {
    const { req, res, next } = mockReqRes();
    protect(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("token хүчингүй бол 401 буцаана", () => {
    const { req, res, next } = mockReqRes({
      authorization: "Bearer буруу token",
    });

    protect(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("token зөв бол req.user-г тохируулаад next() дуудна", () => {
    const token = jwt.sign(
      { id: 1, role: "EMPLOYEE" },
      process.env.JWT_SECRET as string,
    );
    const { req, res, next } = mockReqRes({
      authorization: `Bearer ${token}`,
    });

    protect(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual({
      id: 1,
      role: "EMPLOYEE",
      iat: expect.any(Number),
    });
  });
});

describe("authorize middleware", () => {
  it("req.user байхгүй бол 403 буцаана", () => {
    const { req, res, next } = mockReqRes();
    const middleware = authorize("ADMIN");

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it("эрх таарахгүй бол 403", () => {
    const { req, res, next } = mockReqRes();
    req.user = { id: 1, role: "EMPLOYEE" };
    const middleware = authorize("ADMIN", "HR");

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it("эрх тохирвол next()", () => {
    const { req, res, next } = mockReqRes();
    req.user = { id: 1, role: "ADMIN" };
    const middleware = authorize("ADMIN", "HR");

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});
