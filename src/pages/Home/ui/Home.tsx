import { Outlet } from "react-router";
// import { App } from "src/components/App";

export function Home() {
  return (
    <>
      <div>home</div>
      {/* <App /> - test btn open/clouse sitebar */}
      <Outlet />
    </>
  );
}
