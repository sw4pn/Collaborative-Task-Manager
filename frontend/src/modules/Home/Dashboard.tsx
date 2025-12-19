import { useState } from "react";
import { useTasks } from "./hooks/useTasks";
import { ModalCreateTask } from "./components/ModalCreateTask";
import { TaskFilters } from "./components/TaskFilters";
import { TaskList } from "./components/TaskList";
import type { ITaskFiltersState } from "@/types";
import { useSocketEvents } from "@/hooks/useSocketEvent";

const Dashboard = () => {
  useSocketEvents();

  const [filters, setFilters] = useState<ITaskFiltersState>({
    view: "assigned",
    status: "",
    priority: "",
    order: "asc",
  });

  const { data, isLoading } = useTasks(filters);

  return (
    <div className="max-w-5xl mx-auto md:p-6 space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <ModalCreateTask />
      </div>

      <TaskFilters filters={filters} setFilters={setFilters} />

      <TaskList tasks={data?.data || []} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;
