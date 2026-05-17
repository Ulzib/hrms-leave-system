import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  console.error(err.message);
  res.status(500).json({ message: "Серверт алдаа гарлаа" });
};

export default errorHandler;
