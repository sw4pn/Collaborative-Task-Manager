import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import toast from "react-hot-toast";

import { useCreateTask } from "../hooks/useTasks";
import { useUsers } from "../hooks/useUsers";
import { UserSelect } from "./UserSelect";
import { createTaskSchema, type CreateTaskInput } from "@/schemas/task.schema";
import type { TaskPriorityType } from "@/types/task.types";

export const ModalCreateTask = () => {
  const [open, setOpen] = useState(false);
  const mutation = useCreateTask();
  const { data: usersRes, isLoading: usersLoading } = useUsers(open);

  const users = usersRes?.data ?? [];

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      priority: "MEDIUM",
    },
  });

  const onSubmit = (data: CreateTaskInput) => {
    mutation.mutate(
      {
        ...data,
        dueDate: new Date(data.dueDate).toISOString(),
      },
      {
        onSuccess: () => {
          toast.success("Task created successfully");
          reset();
          setOpen(false);
        },
        onError: (err) => {
          toast.error(err?.message || "Failed to create task");
        },
      }
    );
  };

  // eslint-disable-next-line react-hooks/incompatible-library
  const assignedToId = watch("assignedToId");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ New Task</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new task.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <Label>Title *</Label>
            <Input {...register("title")} />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label>Description *</Label>
            <Textarea {...register("description")} />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Due Date */}
          <div>
            <Label>Due Date *</Label>
            <Input type="date" {...register("dueDate")} />
            {errors.dueDate && (
              <p className="text-sm text-red-500">{errors.dueDate.message}</p>
            )}
          </div>

          {/* Priority + Assign */}
          <div className="flex justify-between gap-4">
            <div className="w-full">
              <Label>Priority</Label>
              <Select
                defaultValue="MEDIUM"
                onValueChange={(v) =>
                  setValue("priority", v as TaskPriorityType)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOW">Low</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="URGENT">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full">
              <Label>
                Assign To<span className="text-xs">(optional)</span>{" "}
              </Label>
              {usersLoading ? (
                <p className="text-sm text-muted-foreground">
                  Loading users...
                </p>
              ) : (
                <UserSelect
                  users={users}
                  value={assignedToId}
                  onChange={(id) => setValue("assignedToId", id)}
                />
              )}
            </div>
          </div>

          <DialogFooter className="mt-8">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="ml-4"
            >
              {mutation.isPending ? "Creating..." : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
