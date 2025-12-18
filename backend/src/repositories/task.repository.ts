import { prisma } from "../config/prisma-client";
import {
  ICreateTaskInput,
  IPublicTask,
  ITasksFilterOptions,
  IUpdateTaskInput,
} from "../types";

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

  async findAll(options: ITasksFilterOptions = {}): Promise<IPublicTask[]> {
    const {
      status,
      priority,
      assignedToId,
      creatorId,
      overdue,
      sortOrder = "asc",
    } = options;

    return prisma.task.findMany({
      where: {
        ...(status && { status }),
        ...(priority && { priority }),
        ...(assignedToId && { assignedToId }),
        ...(creatorId && { creatorId }),
        ...(overdue && {
          dueDate: { lt: new Date() },
          status: { not: "COMPLETED" },
        }),
      },
      orderBy: { dueDate: sortOrder },
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
