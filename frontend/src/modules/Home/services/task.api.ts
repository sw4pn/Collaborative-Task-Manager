import api from "@/lib/api";
import type { ITaskFiltersState } from "@/types/task.types";

export const fetchTasks = (params: ITaskFiltersState) =>
  api.get("/tasks", { params });

export const createTask = (data: Record<string, unknown>) =>
  api.post("/tasks", data);

export const updateTask = ({
  id,
  data,
}: {
  id: string;
  data: Record<string, unknown>;
}) => api.put(`/tasks/${id}`, data);

export const deleteTask = (id: string) => api.delete(`/tasks/${id}`);
