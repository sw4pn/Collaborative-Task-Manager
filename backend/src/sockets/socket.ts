import { Server } from "socket.io";
import http from "http";
import { verifySocketAuth } from "./socket-auth";

let io: Server;

export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: true,
      credentials: true,
    },
  });

  io.use(verifySocketAuth);

  io.on("connection", (socket) => {
    const userId = socket.data.userId;
    socket.join(userId);

    console.log(`User connected: ${userId}`);

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${userId}`);
    });
  });

  return io;
};

export const getIO = (): Server => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
