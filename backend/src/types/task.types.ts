import { ETaskPriority, ETaskStatus } from "../generated/prisma/enums";

export interface IPublicTask {
  id: string;
  title: string;
  description?: string | null;
  dueDate: Date;
  priority: ETaskPriority;
  status: ETaskStatus;
  creatorId: string;
  assignedToId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateTaskInput {
  title: string;
  description: string;
  dueDate: Date;
  priority: ETaskPriority;
  creatorId: string;
  status: ETaskStatus;
  assignedToId?: string | null;
}

export interface IUpdateTaskInput {
  title?: string;
  description?: string;
  dueDate?: Date;
  priority?: ETaskPriority;
  status?: ETaskStatus;
  assignedToId?: string | null;
}
