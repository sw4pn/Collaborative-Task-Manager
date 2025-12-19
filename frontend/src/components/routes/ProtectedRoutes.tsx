import { useAuth } from "@/context/use-auth";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
