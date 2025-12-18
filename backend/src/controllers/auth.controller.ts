import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { LoginDto, RegisterDto } from "../dtos/auth.dto";
import sendResponse from "../utils/send-response";
import { TokenUtils } from "../utils/token.utils";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  registerUser = async (req: Request, res: Response) => {
    const data = RegisterDto.parse(req.body);

    const user = await this.authService.register(data);

    sendResponse(res, 201, true, "User registered successfully", user);
  };

  loginUser = async (req: Request, res: Response) => {
    const data = LoginDto.parse(req.body);

    const { accessToken, refreshToken, ...userData } =
      await this.authService.login(data);

    TokenUtils.setAuthCookies(res, accessToken, refreshToken);

    sendResponse(res, 200, true, "Login successful", {
      ...userData,
      tokens: { accessToken, refreshToken },
    });
  };

  logoutUser = async (_req: Request, res: Response) => {
    TokenUtils.clearAuthCookies(res);

    sendResponse(res, 200, true, "Logout successful");
  };
}
