import { useTasksState } from "../../../store/slices/tasksSlice.ts";
import { useParams } from "react-router-dom";
import Task from "./Task.tsx";
import { useDrop } from "react-dnd";
import { DragDropItems } from "../../../ DragDropItems";
import type { TaskType } from "../../../types/types.ts";
import { useChangeStatus } from "../useChangeStatus.ts";

interface Props {
  tasksStatus: number;
  title: string;
  background: string;
}

function Column({ tasksStatus, title, background }: Props) {
  const { tasks } = useTasksState();
  const { boardId } = useParams();
  const thisTasks = boardId
    ? tasks[boardId]?.filter(({ status }) => status == tasksStatus)
    : [];
  const changeStatus = useChangeStatus();

  const [, drop] = useDrop<Omit<TaskType, "description">>(() => ({
    accept: DragDropItems.TASK,
    drop: (item) => changeStatus(boardId || "", item.id, tasksStatus),
    canDrop: (item) => {
      return item.status != tasksStatus;
    },
  }));

  return (
    <div className="column" ref={drop}>
      <div className="column-header">
        <span className="bullet" style={{ background }}></span>
        <h3>
          {title} ({thisTasks?.length})
        </h3>
      </div>
      <div className="tasks">
        {thisTasks?.map(({ title, id, status }) => (
          <Task title={title} id={id} status={status} key={id} />
        ))}
      </div>
    </div>
  );
}

export default Column;
