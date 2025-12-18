/**
 * Authentication Middleware
 */

import { Request, Response } from "express";
import { TokenUtils } from "../utils/token.utils";
import { AuthError } from "../utils/errors/AuthError";
import { prisma } from "../config/prisma-client";
import { AppError } from "../utils/errors/AppError";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

export const requireAuth = async (
  req: Request,
  _: Response,
  next: Function
) => {
  const token = TokenUtils.getClientToken(req);

  if (!token) {
    throw new AuthError("You must be logged in to access this resource");
  }

  const payload = TokenUtils.verifyAccessToken(token);

  if (!payload || !payload.userId) {
    throw new AuthError("You must be logged in to access this resource");
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user) {
    return next(
      new AppError(
        "Session expired, please login again",
        401,
        "SESSION_EXPIRED"
      )
    );
  }

  req.user = { id: payload.userId };

  next();
};
