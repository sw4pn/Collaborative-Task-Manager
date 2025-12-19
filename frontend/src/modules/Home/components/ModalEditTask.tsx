import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editTaskSchema, type EditTaskInput } from "@/schemas/task.schema";
import { useUpdateTask } from "../hooks/useTasks";
import { UserSelect } from "./UserSelect";
import { useAuth } from "@/context/use-auth";
import type { ITask } from "@/types/task.types";
import { useUsers } from "../hooks/useUsers";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  task: ITask;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export const ModalEditTask = ({ task, open, onOpenChange }: Props) => {
  const { user } = useAuth();
  const isCreator = user?.id === task.creatorId;

  const { data: usersRes, isLoading: usersLoading } = useUsers(open);

  const users = usersRes?.data ?? [];

  const form = useForm<EditTaskInput>({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate.split("T")[0],
      priority: task.priority,
      status: task.status,
      assignedToId: task.assignedToId,
    },
  });

  // eslint-disable-next-line
  const assignedToId = form.watch("assignedToId");

  const mutation = useUpdateTask();

  const onSubmit = (data: EditTaskInput) => {
    mutation.mutate(
      {
        id: task.id,
        data: {
          ...data,
          dueDate: new Date(data.dueDate).toISOString(),
        },
      },
      {
        onSuccess: () => {
          toast.success("Task updated successfully");
          onOpenChange(false);
        },
        onError: (err) => {
          toast.error(err?.message || "Failed to update task");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="mb-2">
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        {!isCreator && (
          <p className="text-sm text-muted-foreground">
            Only the task creator can edit this task.
          </p>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input {...form.register("title")} disabled={!isCreator} />
          </div>

          <div>
            <Label>Description</Label>
            {/* <Input {...form.register("description")} disabled={!isCreator} /> */}
            <Textarea {...form.register("description")} disabled={!isCreator} />
          </div>

          <div>
            <Label>Due Date</Label>
            <Input
              type="date"
              {...form.register("dueDate")}
              disabled={!isCreator}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Priority */}
            <div>
              <Label>Priority</Label>
              <Controller
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={!isCreator}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                      <SelectItem value="URGENT">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Status */}
            <div>
              <Label>Status</Label>
              <Controller
                control={form.control}
                name="status"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={!isCreator}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TODO">Todo</SelectItem>
                      <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                      <SelectItem value="REVIEW">Review</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div>
            <Label>Assign To</Label>
            {usersLoading ? (
              <p className="text-sm text-muted-foreground">Loading users...</p>
            ) : (
              <UserSelect
                users={users}
                value={assignedToId ?? undefined}
                onChange={(id) => form.setValue("assignedToId", id)}
              />
            )}
          </div>

          <Button
            type="submit"
            disabled={!isCreator || mutation.isPending}
            className="w-full mt-4"
          >
            {mutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
