import { User } from "../generated/prisma/client";
import { UserRepository } from "../repositories/user.repository";
import { ICreateUserInput, IUpdateUserInput } from "../types";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userData: ICreateUserInput): Promise<User> {
    return this.userRepository.createUser(userData);
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async getUserByEmail(email: string, isAuth: boolean = false): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error(isAuth ? "Invalid email or password" : "User not found");
    }

    return user;
  }

  async checkForEmailAvailability(email: string): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error("Email already in use");
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
