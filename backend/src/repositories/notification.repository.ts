import { prisma } from "../config/prisma-client";

export class NotificationRepository {
  async create(userId: string, message: string) {
    return prisma.notification.create({
      data: { userId, message },
    });
  }

  async findByUser(userId: string) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }
}
