import type { IUser } from "@/types";
import { createContext } from "react";

export type AuthContextType = {
  user: IUser | null;
  token: string | null;
  login: (token: string, user: IUser) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
