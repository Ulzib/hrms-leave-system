import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err.message);
  res.status(500).json({ message: "Серверт алдаа гарлаа" });
};

export default errorHandler;
