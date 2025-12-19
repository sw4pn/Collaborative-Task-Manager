import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export const useUsers = (enabled: boolean) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => api.get("/users/assignee"),
    enabled,
  });
};
