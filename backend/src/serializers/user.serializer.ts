import { User } from "../generated/prisma/client";
import { IPublicUser } from "../types";

export const serializeUser = (user: User): IPublicUser => ({
  id: user.id,
  email: user.email,
  name: user.name,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
