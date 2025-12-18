import { getIO } from "./socket";
import { SocketEvents } from "./socket-events";

export const SocketGateway = {
  emitTaskUpdated(task: any) {
    const io = getIO();
    io.emit(SocketEvents.TASK_UPDATED, task);
  },

  emitTaskAssigned(userId: string, payload: any) {
    const io = getIO();
    io.to(userId).emit(SocketEvents.TASK_ASSIGNED, payload);
  },
};
