import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-14 border-b px-4 flex items-center">
        <h1 className="font-semibold">Task Manager</h1>
      </header>

      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
