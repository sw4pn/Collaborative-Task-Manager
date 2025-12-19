import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/use-auth";
import AuthLayout from "./AuthLayout";
import AuthCard from "./components/AuthCard";
import { loginSchema, type LoginInput } from "./schemas/auth.schema";
import { loginUser } from "./services/auth.api";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      login(res.data?.tokens?.accessToken, res.data.user);
      toast.success(res?.data?.message ?? "Logged in successfully");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error?.message || "Login failed");
    },
  });

  return (
    <AuthLayout>
      <AuthCard title="Login">
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
        >
          <Input placeholder="Email" {...form.register("email")} />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500">
              {form.formState.errors.email.message}
            </p>
          )}

          <Input
            type="password"
            placeholder="Password"
            {...form.register("password")}
          />
          {form.formState.errors.password && (
            <p className="text-sm text-red-500">
              {form.formState.errors.password.message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full mt-2"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Logging in..." : "Login"}
          </Button>

          {/* {mutation.isError && (
            <p className="text-sm text-red-500 text-center">
              {(mutation.error as any)?.message || "Login failed"}
            </p>
          )} */}

          <p className="text-sm text-slate-500 text-center">
            Don’t have an account?{" "}
            <Link className="underline text-slate-800 ml-1" to="/register">
              Register
            </Link>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default Login;
