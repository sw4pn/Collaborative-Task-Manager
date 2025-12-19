import { getIO } from "./socket";
import { SocketEvents } from "./socket-events";

export const SocketGateway = {
  emitTaskCreated(task: any) {
    const io = getIO();
    io.emit(SocketEvents.TASK_CREATED, task);
  },

  emitTaskUpdated(task: any) {
    const io = getIO();
    io.emit(SocketEvents.TASK_UPDATED, task);
  },

  emitTaskAssigned(userId: string, payload: any) {
    const io = getIO();
    io.to(`user:${userId}`).emit(SocketEvents.TASK_ASSIGNED, payload);
  },
};
