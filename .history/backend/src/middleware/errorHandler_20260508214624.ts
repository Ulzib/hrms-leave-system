import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err.message);
  res.status(500).json({ message: "Серверт алдаа гарлаа" });
};

export default errorHandler;
