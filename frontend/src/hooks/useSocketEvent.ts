import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useSocketEvents = () => {
  const qc = useQueryClient();

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("🟢 Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected");
    });

    socket.on("task.created", () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    });

    socket.on("task.updated", () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    });

    socket.on("task.assigned", (payload) => {
      toast.success(payload.message, {
        duration: 5000,
      });
      qc.invalidateQueries({ queryKey: ["tasks"] });
    });

    return () => {
      socket.off();
      socket.disconnect();
    };
  }, [qc]);
};
