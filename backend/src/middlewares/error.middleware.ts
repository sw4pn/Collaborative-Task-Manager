import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors/AppError";
import { ZodError } from "zod";
import sendResponse from "../utils/send-response";
import config from "../config/config";
import { formatZodError } from "../utils/errors/zodErrorFormatter";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const requestInfo = {
    method: req.method,
    path: req.originalUrl,
  };

  // Zod Validation Error
  if (err instanceof ZodError) {
    return sendResponse(res, 400, false, "Validation Error", {
      errors: formatZodError(err),
      ...requestInfo,
    });
  }

  // Operational Errors
  if (err instanceof AppError) {
    return sendResponse(res, err.statusCode, false, err.message, {
      errorCode: err.errorCode,
      ...requestInfo,
    });
  }

  // Programming or unknown errors
  console.error(`Unexpected Error on ${req.method} ${req.originalUrl}:`, err);
  return sendResponse(res, 500, false, "Internal Server Error", {
    ...(config.isProduction ? {} : { stack: err }),
    ...requestInfo,
  });
};
