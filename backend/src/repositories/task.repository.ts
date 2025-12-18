import { prisma } from "../config/prisma-client";
import { ICreateTaskInput, IPublicTask, IUpdateTaskInput } from "../types";

export class TaskRepository {
  async create(input: ICreateTaskInput): Promise<IPublicTask> {
    return prisma.task.create({
      data: {
        title: input.title,
        description: input.description,
        dueDate: input.dueDate,
        priority: input.priority,
        status: input.status,
        creatorId: input.creatorId,
        assignedToId: input.assignedToId ?? null,
      },
    });
  }

  async findById(taskId: string): Promise<IPublicTask | null> {
    return prisma.task.findUnique({
      where: { id: taskId },
    });
  }

  async findAll(): Promise<IPublicTask[]> {
    return prisma.task.findMany({
      orderBy: { dueDate: "asc" },
    });
  }

  async update(taskId: string, input: IUpdateTaskInput): Promise<IPublicTask> {
    return prisma.task.update({
      where: { id: taskId },
      data: input,
    });
  }

  async delete(taskId: string): Promise<IPublicTask> {
    return prisma.task.delete({
      where: { id: taskId },
    });
  }
}
