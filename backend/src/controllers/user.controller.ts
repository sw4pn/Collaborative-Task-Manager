import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import sendResponse from "../utils/send-response";
import { UpdateProfileDto } from "../dtos/user.dto";

export class UserController {
  constructor(private readonly userService: UserService) {}

  getUserProfile = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    const user = await this.userService.getUserById(userId);

    sendResponse(res, 200, true, "User profile fetched successfully", user);
  };

  getSelfProfile = async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const user = await this.userService.getUserById(userId);

    sendResponse(res, 200, true, "User profile fetched successfully", user);
  };

  updateUserProfile = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const data = UpdateProfileDto.parse(req.body);

    const user = await this.userService.updateUserProfile(userId, data);

    sendResponse(res, 200, true, "Profile updated successfully", user);
  };
}
