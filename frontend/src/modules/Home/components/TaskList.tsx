import type { ITask } from "@/types";
import { TaskCard } from "./TaskCard";
import { TaskCardSkeleton } from "@/components/skeletons/TaskCardSkeleton";

export const TaskList = ({
  tasks,
  isLoading,
}: {
  tasks: ITask[];
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <div className="grid gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <TaskCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  if (!tasks?.length)
    return (
      <div className="flex justify-center items-center py-10 border rounded-md">
        <p className="text-slate-400">No tasks found.</p>
      </div>
    );

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};
