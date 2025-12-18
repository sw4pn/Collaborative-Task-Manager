import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors/AppError";

export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404, "NOT_FOUND"));
};
