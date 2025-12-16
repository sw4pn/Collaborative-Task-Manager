import { z } from "zod";

export const RegisterDto = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1).max(100),
});

export const LoginDto = z.object({
  email: z.email(),
  password: z.string().min(1),
});
