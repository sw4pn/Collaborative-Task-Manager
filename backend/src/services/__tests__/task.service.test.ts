import { TaskService } from "../task.service";
import { AppError } from "../../utils/errors/AppError";
import { ETaskStatus } from "../../generated/prisma/enums";
import { SocketGateway } from "../../sockets/socket.gateway";

// ----- Mocks -----
const mockTaskRepository = {
  findById: jest.fn(),
  update: jest.fn(),
};

const mockNotificationRepository = {
  create: jest.fn(),
};

jest.mock("../../sockets/socket.gateway.ts", () => ({
  SocketGateway: {
    emitTaskUpdated: jest.fn(),
    emitTaskAssigned: jest.fn(),
  },
}));

// ----- TESTS -----

describe("TaskService.updateTask", () => {
  let taskService: TaskService;

  beforeEach(() => {
    taskService = new TaskService(
      mockTaskRepository as any,
      mockNotificationRepository as any
    );
  });

  it("throws TASK_NOT_FOUND if task does not exist", async () => {
    mockTaskRepository.findById.mockResolvedValue(null);

    await expect(
      taskService.updateTask("task-id", "user-id", {
        title: "New Title",
      })
    ).rejects.toThrow(new AppError("Task not found", 404, "TASK_NOT_FOUND"));
  });

  it("throws FORBIDDEN if user is not task creator", async () => {
    mockTaskRepository.findById.mockResolvedValue({
      id: "task-id",
      creatorId: "another-user",
      assignedToId: null,
    });

    await expect(
      taskService.updateTask("task-id", "user-id", {
        title: "Hacked title",
      })
    ).rejects.toThrow(new AppError("Forbidden", 403, "FORBIDDEN"));
  });

  it("updates task and emits socket events when valid", async () => {
    const existingTask = {
      id: "task-id",
      title: "Old title",
      creatorId: "user-id",
      assignedToId: null,
    };

    const updatedTask = {
      ...existingTask,
      title: "Updated title",
      assignedToId: "new-user-id",
      status: ETaskStatus.IN_PROGRESS,
    };

    mockTaskRepository.findById.mockResolvedValue(existingTask);
    mockTaskRepository.update.mockResolvedValue(updatedTask);

    const result = await taskService.updateTask("task-id", "user-id", {
      title: "Updated title",
      assignedToId: "new-user-id",
      status: ETaskStatus.IN_PROGRESS,
    });

    expect(result).toEqual(updatedTask);
    expect(SocketGateway.emitTaskUpdated).toHaveBeenCalledWith(updatedTask);
    expect(SocketGateway.emitTaskAssigned).toHaveBeenCalledWith(
      "new-user-id",
      expect.objectContaining({
        taskId: "task-id",
      })
    );
  });
});
