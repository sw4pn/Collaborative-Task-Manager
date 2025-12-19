import { Outlet } from "react-router";
import UserMenu from "./UserMenu";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-slate-200 border-slate-400 shadow-sm py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-2 flex-wrap gap-y-2 gap-x-4">
          <h1 className="text-lg sm:text-2xl font-bold text-slate-700">
            Collaborative Task Management
          </h1>

          <UserMenu />
        </div>
      </header>

      <main className="flex-1 p-4">
        <Outlet />
      </main>

      <footer className="flex flex-col items-center justify-center gap-4 py-4 border-y bg-neutral-100 text-neutral-600 border-slate-300">
        <div className="text-sm text-neutral-500">
          Developed with ReactJs+Vite, TailwindCSS & ShadcnUI
        </div>
        <div className="">
          by: Swapnil Andhale |{" "}
          <a
            href="https://github.com/sw4pn"
            className="underline text-blue-600"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>{" "}
          |{" "}
          <a
            href="https://www.linkedin.com/in/swapnil-andhale/"
            target="_blank"
            rel="noreferrer"
            className="underline text-blue-600"
          >
            LinkedIn
          </a>{" "}
          |{" "}
          <a
            href="https://swapnilandhale.dev/"
            target="_blank"
            rel="noreferrer"
            className="underline text-blue-600"
          >
            Portfolio
          </a>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
