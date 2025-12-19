import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "@/context/use-auth";
import api from "@/lib/api";
import { z } from "zod";

const editProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

type EditProfileInput = z.infer<typeof editProfileSchema>;

interface ModalEditProfileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ModalEditProfile = ({
  open,
  onOpenChange,
}: ModalEditProfileProps) => {
  const { user, setUser } = useAuth();

  const form = useForm<EditProfileInput>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user?.name ?? "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: EditProfileInput) => api.put("/users/profile", data),
    onSuccess: (res) => {
      toast.success("Profile updated successfully");

      // Update auth context + localStorage
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));

      onOpenChange(false);
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to update profile");
    },
  });

  const onSubmit = (data: EditProfileInput) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="pb-2 mb-2">
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <Label>Name</Label>
            <Input {...form.register("name")} />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* Email (read-only) */}
          <div className=" cursor-not-allowed">
            <Label>Email</Label>
            <Input value={user?.email ?? ""} disabled />
          </div>

          <DialogFooter className="mt-8">
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full"
            >
              {mutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
