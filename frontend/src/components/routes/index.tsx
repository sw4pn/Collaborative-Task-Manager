import { Navigate, Route, Routes } from "react-router";
import ProtectedRoutes from "./ProtectedRoutes";
import { Suspense } from "react";
import NotFound from "@/modules/NotFound/NotFound";
import MainLayout from "../Layout/MainLayout";
import { authRoutes, routes } from "./routes";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Protected */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<MainLayout />}>
          <Route index element={<Navigate to="/home" replace />} />
          {routes.map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Component />
                </Suspense>
              }
            />
          ))}
        </Route>
      </Route>

      {/* Auth */}
      {authRoutes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Component />
            </Suspense>
          }
        />
      ))}

      {/* Not Found Handler */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
