import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ModalEditTask } from "./ModalEditTask";
import { useAuth } from "@/context/use-auth";
import type { ITask } from "@/types/task.types";

interface TaskCardProps {
  task: ITask;
}

const priorityColor: Record<string, string> = {
  LOW: "bg-gray-500",
  MEDIUM: "bg-blue-500",
  HIGH: "bg-orange-500",
  URGENT: "bg-red-500",
};

export const TaskCard = ({ task }: TaskCardProps) => {
  const { user } = useAuth();
  const [editOpen, setEditOpen] = useState(false);

  const isCreator = user?.id === task.creatorId;

  return (
    <div className="border rounded-lg p-4 space-y-3 bg-white">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold">{task.title}</h3>

        <Badge className={priorityColor[task.priority]}>{task.priority}</Badge>
      </div>

      <p className="text-sm text-muted-foreground">{task.description}</p>

      <div className="flex justify-between items-center text-sm text-slate-600">
        <div>
          Status:{" "}
          <span className="border px-2 py-1 rounded-lg ml-2 text-slate-700 font-medium">
            {" "}
            {task.status}
          </span>
        </div>
        <div>Due: {task.dueDate.split("T")[0]}</div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          Assigned to: {task.assignedTo?.name ?? "Unassigned"}
        </span>

        {isCreator && (
          <Button size="sm" variant="outline" onClick={() => setEditOpen(true)}>
            Edit
          </Button>
        )}
      </div>

      {isCreator && (
        <ModalEditTask task={task} open={editOpen} onOpenChange={setEditOpen} />
      )}
    </div>
  );
};
