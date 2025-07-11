import { useTasksState } from "../../../store/slices/tasksSlice.ts";
import { useParams } from "react-router-dom";

interface Props {
  index: number;
  title: string;
  background: string;
}

function Column({ index, title, background }: Props) {
  const { tasks } = useTasksState();
  const { boardId } = useParams();
  const thisTasks = boardId
    ? tasks[boardId]?.filter(({ status }) => status == index)
    : [];
  return (
    <div className="column">
      <div className="column-header">
        <span className="bullet" style={{ background }}></span>
        <h3>
          {title} ({thisTasks?.length})
        </h3>
      </div>
      <div className="tasks">
        {thisTasks?.map(({ title, id }) => (
          <div className="task" key={id}>
            <h4>{title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Column;
