import type { IUser } from "./user.types";

export type TaskPriorityType = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type TaskStatusType = "TODO" | "REVIEW" | "IN_PROGRESS" | "COMPLETED";

export interface ITask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriorityType;
  status: TaskStatusType;
  creatorId: string;
  assignedToId?: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: IUser;
}

export interface ITaskFiltersState {
  view?: "assigned" | "created" | "overdue";
  status?: string;
  priority?: string;
  order: "asc" | "desc";
}
