import { User } from "../generated/prisma/client";
import { UserRepository } from "../repositories/user.repository";
import { serializeUser } from "../serializers/user.serializer";
import { ICreateUserInput, IPublicUser, IUpdateUserInput } from "../types";
import { AppError } from "../utils/errors/AppError";
import { AuthError } from "../utils/errors/AuthError";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userData: ICreateUserInput): Promise<IPublicUser> {
    const user = await this.userRepository.createUser(userData);
    return serializeUser(user);
  }

  async getUserById(userId: string): Promise<IPublicUser> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new AppError("User not found", 404, "USER_NOT_FOUND");
    }

    return serializeUser(user);
  }

  async getUserByEmail(email: string): Promise<IPublicUser> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("User not found", 404, "USER_NOT_FOUND");
    }

    return serializeUser(user);
  }

  async getUserByEmailWithPassword(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AuthError("Invalid email or password");
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
  ): Promise<IPublicUser> {
    await this.getUserById(userId);

    const user = await this.userRepository.updateUser(userId, data);
    return serializeUser(user);
  }

  async getAllAssignees(userId: string): Promise<IPublicUser[]> {
    const assignees = await this.userRepository.findAllAssignees(userId);
    return assignees.map(serializeUser);
  }
}
