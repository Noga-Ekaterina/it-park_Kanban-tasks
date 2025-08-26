import { Header } from "./Header";
import Column from "./Column.tsx";
import { useFetchingTasks } from "../model/useFetchingTasks.ts";
import { Loader } from "../../Loader";

export function MainContent() {
  const { isLoad, errorMessage } = useFetchingTasks();
  return (
    <div className="main-content">
      <Header />

      {/* <!-- Kanban Board --> */}

      {isLoad ? (
        <div className="kanban-board">
          <Loader />
          <Loader />
          <Loader />
        </div>
      ) : errorMessage ? (
        <div
          className="error"
          style={{ marginTop: "40px", textAlign: "center" }}
        >
          {errorMessage}
        </div>
      ) : (
        <div className="kanban-board">
          {/* <!-- Todo Column --> */}
          <Column tasksStatus={0} title={"TODO"} background={"#49C4E5"} />

          {/* <!-- Doing Column --> */}
          <Column tasksStatus={1} title={"DOING"} background={"#8471F2"} />

          {/* <!-- Done Column --> */}
          <Column tasksStatus={2} title={"DONE"} background={"#67E2AE"} />
        </div>
      )}
    </div>
  );
}
