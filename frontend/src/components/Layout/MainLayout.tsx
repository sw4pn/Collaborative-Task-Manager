import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-center border-b shadow-lg bg-slate-200 border-slate-400">
        <h1 className="py-10 text-lg p-2 font-bold sm:text-2xl font-mont text-slate-700">
          Collaborative Task Management Application
        </h1>
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
            href="https://www.linkedin.com/in/swapnil-andhale-9829a5184/"
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
