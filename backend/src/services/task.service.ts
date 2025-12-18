import { NotificationRepository } from "../repositories/notification.repository";
import { TaskRepository } from "../repositories/task.repository";
import { SocketGateway } from "../sockets/socket.gateway";
import {
  ICreateTaskInput,
  IPublicTask,
  ITasksFilterOptions,
  IUpdateTaskInput,
} from "../types";
import { AppError } from "../utils/errors/AppError";

export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly notificationRepository = new NotificationRepository()
  ) {}

  async createTask(data: ICreateTaskInput): Promise<IPublicTask> {
    return this.taskRepository.create(data);
  }

  async getTaskById(taskId: string) {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new AppError("Task not found", 404, "TASK_NOT_FOUND");
    }

    return task;
  }

  async getAllTasks(options: ITasksFilterOptions = {}) {
    return this.taskRepository.findAll(options);
  }

  async updateTask(taskId: string, userId: string, data: IUpdateTaskInput) {
    const task = await this.getTaskById(taskId);

    // Authorization: only creator can update
    if (task.creatorId !== userId) {
      throw new AppError("Forbidden", 403, "FORBIDDEN");
    }

    const updatedTask = await this.taskRepository.update(taskId, data);

    // Real-Time update
    SocketGateway.emitTaskUpdated(updatedTask);

    // notification on assignment change
    if (data.assignedToId && data.assignedToId !== task.assignedToId) {
      const message = `You have been assigned a new task: ${updatedTask.title}`;

      await this.notificationRepository.create(data.assignedToId, message);

      SocketGateway.emitTaskAssigned(data.assignedToId, {
        taskId: updatedTask.id,
        message,
      });
    }

    return updatedTask;
  }

  async deleteTask(taskId: string, userId: string) {
    const task = await this.getTaskById(taskId);

    if (task.creatorId !== userId) {
      throw new AppError("Forbidden", 403, "FORBIDDEN");
    }

    await this.taskRepository.delete(taskId);
  }
}
