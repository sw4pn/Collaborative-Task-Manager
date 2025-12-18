import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import type { CookieOptions } from "express";
import config from "../config/config";
import { IJwtTokenPayload } from "../types";

const ACCESS_TOKEN_TTL = 3 * 60 * 60; // 3 hours
const REFRESH_TOKEN_TTL = 7 * 24 * 60 * 60; // 7 days

/**
 * ============================
 * JWT SIGNING
 * ============================
 */
const signAccessToken = (payload: IJwtTokenPayload): string => {
  return jwt.sign(payload, config.JWT_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_TTL,
  });
};

const signRefreshToken = (payload: IJwtTokenPayload): string => {
  return jwt.sign(payload, config.JWT_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_TTL,
  });
};

/**
 * ============================
 * COOKIE CONFIG
 * ============================
 */

const sameSiteOption: CookieOptions["sameSite"] = config.isProduction
  ? "strict"
  : "lax";

const baseCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: config.isProduction,
  sameSite: sameSiteOption,
  path: "/",
};

const accessCookieOptions: CookieOptions = {
  ...baseCookieOptions,
  maxAge: ACCESS_TOKEN_TTL * 1000,
};

const refreshCookieOptions: CookieOptions = {
  ...baseCookieOptions,
  maxAge: REFRESH_TOKEN_TTL * 1000,
};

/**
 * ============================
 * TOKEN MANAGEMENT
 * ============================
 */
const issueTokens = (userId: string) => {
  const accessToken = signAccessToken({ userId });
  const refreshToken = signRefreshToken({ userId });

  return { accessToken, refreshToken };
};

const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken?: string
) => {
  res.cookie("access_token", accessToken, accessCookieOptions);

  if (refreshToken) {
    res.cookie("refresh_token", refreshToken, refreshCookieOptions);
  }
};

const clearAuthCookies = (res: Response) => {
  res.cookie("access_token", "", { ...baseCookieOptions, maxAge: 0 });
  res.cookie("refresh_token", "", { ...baseCookieOptions, maxAge: 0 });
};

/**
 * ============================
 * TOKEN EXTRACTION
 * ============================
 */
const getClientToken = (req: Request, refresh = false): string | undefined => {
  const cookieName = refresh ? "refresh_token" : "access_token";

  // 1️⃣ HttpOnly cookie
  if (req.cookies?.[cookieName]) {
    return req.cookies[cookieName];
  }

  // 2️⃣ Authorization header (Bearer)
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }

  return undefined;
};

/**
 * ============================
 * TOKEN VERIFICATION
 * ============================
 */
const verifyAccessToken = (token: string): IJwtTokenPayload | undefined => {
  try {
    return jwt.verify(token, config.JWT_TOKEN_SECRET) as IJwtTokenPayload;
  } catch {
    return undefined;
  }
};

export const TokenUtils = {
  issueTokens,
  setAuthCookies,
  clearAuthCookies,
  getClientToken,
  verifyAccessToken,
};
