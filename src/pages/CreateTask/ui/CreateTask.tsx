import { Outlet } from "react-router";
import { CreateTaskModal } from "../../../components/CreateTaskModal";

export function CreateTask() {
  return (
    <>
      <CreateTaskModal />
      <Outlet />
    </>
  );
}
