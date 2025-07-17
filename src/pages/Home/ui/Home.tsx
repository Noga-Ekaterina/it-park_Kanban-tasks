import { Outlet } from "react-router";
import { Sidebar } from "../../../components/Sidebar";

export function Home() {
  return (
    <>
      <div className="app-container">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}
