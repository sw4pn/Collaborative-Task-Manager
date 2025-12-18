import { z } from "zod";
import { ETaskPriority, ETaskStatus } from "../generated/prisma/enums";

export const CreateTaskDto = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(5).max(500),
  dueDate: z.iso.datetime(),
  priority: z.enum(ETaskPriority),
  assignedToId: z.uuid().optional(),
  status: z.enum(ETaskStatus).optional(),
});

export const UpdateTaskDto = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
  dueDate: z.iso.datetime().optional(),
  priority: z.enum(ETaskPriority).optional(),
  status: z.enum(ETaskStatus).optional(),
  assignedToId: z.uuid().nullable().optional(),
});
