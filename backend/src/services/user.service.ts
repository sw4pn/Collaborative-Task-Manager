import { User } from "../generated/prisma/client";
import { UserRepository } from "../repositories/user.repository";
import { ICreateUserInput, IUpdateUserInput } from "../types";
import { AppError } from "../utils/errors/AppError";
import { AuthError } from "../utils/errors/AuthError";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userData: ICreateUserInput): Promise<User> {
    return this.userRepository.createUser(userData);
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new AppError("User not found", 404, "USER_NOT_FOUND");
    }

    return user;
  }

  async getUserByEmail(email: string, isAuth: boolean = false): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      if (isAuth) {
        throw new AuthError("Invalid email or password");
      } else {
        throw new AppError("User not found", 404, "USER_NOT_FOUND");
      }
    }

    return user;
  }

  async checkForEmailAvailability(email: string): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new AppError("Email already in use", 409, "EMAIL_ALREADY_EXISTS");
    }
  }

  async updateUserProfile(
    userId: string,
    data: IUpdateUserInput
  ): Promise<User> {
    await this.getUserById(userId);

    return this.userRepository.updateUser(userId, data);
  }
}
