/**
 * Authentication Middleware
 */

import { Request, Response } from "express";
import { TokenUtils } from "../utils/token.utils";

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
    throw new Error("You must be logged in to access this resource");
  }

  const payload = TokenUtils.verifyAccessToken(token);

  if (!payload) {
    throw new Error("Session expired. Please log in again.");
  }

  req.user = { id: payload.userId };

  next();
};
