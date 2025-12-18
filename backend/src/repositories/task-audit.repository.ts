import { prisma } from "../config/prisma-client";

export class TaskAuditRepository {
  async log(params: { taskId: string; userId: string; action: string }) {
    return prisma.taskAuditLog.create({
      data: {
        taskId: params.taskId,
        userId: params.userId,
        action: params.action,
      },
    });
  }
}
