import { Outlet } from "react-router";
import { Sidebar } from 'src/components/Sidebar'

export function Home() {
  return (
    <>
      <Sidebar/>
      <Outlet />
    </>
  );
}
