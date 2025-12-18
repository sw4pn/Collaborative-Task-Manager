import { Request, Response } from "express";
import { CreateTaskDto, UpdateTaskDto } from "../dtos/task.dto";
import { TaskService } from "../services/task.service";
import sendResponse from "../utils/send-response";
import { ETaskPriority, ETaskStatus } from "../generated/prisma/enums";
import { ITasksFilterOptions } from "../types";

export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  create = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const data = CreateTaskDto.parse(req.body);

    const task = await this.taskService.createTask({
      ...data,
      dueDate: new Date(data.dueDate),
      creatorId: userId,
      status: data.status ?? ETaskStatus.TODO,
    });

    return sendResponse(res, 201, true, "Task created successfully", task);
  };

  getAll = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { status, priority, view, order = "asc" } = req.query;

    const options: ITasksFilterOptions = {
      sortOrder: order === "desc" ? "desc" : "asc",
    };

    if (status) options.status = status as ETaskStatus;
    if (priority) options.priority = priority as ETaskPriority;

    if (view === "assigned") {
      options.assignedToId = userId;
    }

    if (view === "created") {
      options.creatorId = userId;
    }

    if (view === "overdue") {
      options.assignedToId = userId;
      options.overdue = true;
    }

    const tasks = await this.taskService.getAllTasks(options);

    return sendResponse(res, 200, true, "Tasks fetched successfully", tasks);
  };

  getById = async (req: Request, res: Response) => {
    const task = await this.taskService.getTaskById(req.params.id);

    return sendResponse(res, 200, true, "Task fetched successfully", task);
  };

  update = async (req: Request, res: Response) => {
    const data = UpdateTaskDto.parse(req.body);

    const task = await this.taskService.updateTask(
      req.params.id,
      req.user!.id,
      { ...data, dueDate: data.dueDate ? new Date(data.dueDate) : undefined }
    );

    return sendResponse(res, 200, true, "Task updated successfully", task);
  };

  delete = async (req: Request, res: Response) => {
    await this.taskService.deleteTask(req.params.id, req.user!.id);

    return sendResponse(res, 200, true, "Task deleted successfully");
  };
}
