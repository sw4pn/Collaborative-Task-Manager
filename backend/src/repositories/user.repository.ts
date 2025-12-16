import { prisma } from "../config/prisma-client";
import { User } from "../generated/prisma/client";
import { ICreateUserInput, IUpdateUserInput } from "../types";

export class UserRepository {
  async findUserById(userId: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(userData: ICreateUserInput): Promise<User> {
    return prisma.user.create({
      data: userData,
    });
  }

  async updateUser(
    userId: string,
    updateData: IUpdateUserInput
  ): Promise<User> {
    return prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  }
}
