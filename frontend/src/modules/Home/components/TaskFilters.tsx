import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { ITaskFiltersState } from "@/types";
import type { Dispatch, SetStateAction } from "react";

interface ITaskFiltersProps {
  filters: ITaskFiltersState;
  setFilters: Dispatch<SetStateAction<ITaskFiltersState>>;
}

export const TaskFilters = ({ filters, setFilters }: ITaskFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* View */}
      <Select
        value={filters.view ?? "all"}
        onValueChange={(v) =>
          setFilters((prev) => ({
            ...prev,
            view:
              v === "all"
                ? undefined
                : (v as "assigned" | "created" | "overdue"),
          }))
        }
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="View" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="assigned">Assigned</SelectItem>
          <SelectItem value="created">Created</SelectItem>
          <SelectItem value="overdue">Overdue</SelectItem>
          <SelectItem value="all">All</SelectItem>
        </SelectContent>
      </Select>

      {/* Status */}
      <Select
        value={filters.status ?? "all"}
        onValueChange={(v) =>
          setFilters((prev) => ({
            ...prev,
            status: v === "all" ? undefined : v,
          }))
        }
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="TODO">Todo</SelectItem>
          <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
          <SelectItem value="REVIEW">Review</SelectItem>
          <SelectItem value="COMPLETED">Completed</SelectItem>
        </SelectContent>
      </Select>

      {/* Priority */}
      <Select
        value={filters.priority ?? "all"}
        onValueChange={(v) =>
          setFilters((prev) => ({
            ...prev,
            priority: v === "all" ? undefined : v,
          }))
        }
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priority</SelectItem>
          <SelectItem value="LOW">Low</SelectItem>
          <SelectItem value="MEDIUM">Medium</SelectItem>
          <SelectItem value="HIGH">High</SelectItem>
          <SelectItem value="URGENT">Urgent</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort */}
      <Button
        variant="outline"
        onClick={() =>
          setFilters((prev) => ({
            ...prev,
            order: prev.order === "asc" ? "desc" : "asc",
          }))
        }
      >
        Sort: {filters.order === "asc" ? "Asc" : "Desc"}
      </Button>
    </div>
  );
};
