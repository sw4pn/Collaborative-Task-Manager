/**
 * Authentication Middleware
 */

import { Request, Response } from "express";
import { TokenUtils } from "../utils/token.utils";
import { AuthError } from "../utils/errors/AuthError";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

export const requireAuth = (req: Request, _: Response, next: Function) => {
  const token = TokenUtils.getClientToken(req);

  if (!token) {
    throw new AuthError("You must be logged in to access this resource");
  }

  const payload = TokenUtils.verifyAccessToken(token);

  if (!payload) {
    throw new AuthError("Session expired. Please log in again.");
  }

  req.user = { id: payload.userId };

  next();
};
