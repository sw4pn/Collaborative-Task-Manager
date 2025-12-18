import { Socket } from "socket.io";
import { AuthError } from "../utils/errors/AuthError";
import { TokenUtils } from "../utils/token.utils";

export const verifySocketAuth = (
  socket: Socket,
  next: (err?: Error) => void
) => {
  const token =
    socket.handshake.auth?.token ||
    socket.handshake.headers?.authorization?.replace("Bearer ", "");

  if (!token) {
    return next(new AuthError("Unauthorized socket connection."));
  }

  const payload = TokenUtils.verifyAccessToken(token);

  if (!payload) {
    return next(new AuthError("Invalid or expired token."));
  }

  socket.data.userId = payload.userId;
  next();
};
