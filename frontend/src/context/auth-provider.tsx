import { type ReactNode, useState } from "react";
import { AuthContext } from "./auth-context";
import type { IUser } from "@/types";
import { useNavigate } from "react-router";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<IUser | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const login = (token: string, user: IUser) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
