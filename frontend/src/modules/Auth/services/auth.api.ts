import api from "@/lib/api";
import type { LoginInput, RegisterInput } from "../schemas/auth.schema";

export const loginUser = async (data: LoginInput) => {
  return api.post("/auth/login", data);
};

export const registerUser = async (data: RegisterInput) => {
  return api.post("/auth/register", data);
};
