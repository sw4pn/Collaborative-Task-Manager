import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthLayout from "./AuthLayout";
import AuthCard from "./components/AuthCard";
import { registerSchema, type RegisterInput } from "../../schemas/auth.schema";
import { registerUser } from "./services/auth.api";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (res) => {
      toast.success(
        res?.data?.message ?? "Account created successfully, Please login"
      );
      setTimeout(() => {
        navigate("/login");
      }, 500);
    },
    onError: (error) => {
      toast.error(error?.message || "Registration failed");
    },
  });

  return (
    <AuthLayout>
      <AuthCard title="Register">
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
        >
          <Input placeholder="Name" {...form.register("name")} />
          {form.formState.errors.name && (
            <p className="text-sm text-red-500">
              {form.formState.errors.name.message}
            </p>
          )}

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
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Creating account..." : "Register"}
          </Button>

          <p className="text-sm text-center text-slate-500">
            Already have an account?{" "}
            <Link className="underline text-slate-800 ml-1" to="/login">
              Login
            </Link>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default Register;
