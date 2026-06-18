import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function AppLayout() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr] bg-gray-100 dark:bg-black">
      <NavBar />
      <main className="overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
