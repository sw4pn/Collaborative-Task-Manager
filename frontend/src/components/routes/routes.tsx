// app/routes.ts
import Dashboard from "@/modules/Home/Dashboard";
import Tasks from "@/modules/Tasks/Tasks";
import Login from "@/modules/Auth/Login";
import Register from "@/modules/Auth/Register";

export const routes = [
  { path: "/home", Component: Dashboard },
  { path: "/tasks", Component: Tasks },
];

export const authRoutes = [
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
];
