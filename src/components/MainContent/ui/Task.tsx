import { useDrag } from "react-dnd";
import { DragDropItems } from "../../../variables.ts";
import type { TaskType } from "../../../types/types.ts";
import { useNavigate } from "react-router-dom";

function Task({ title, id, status }: Omit<TaskType, "description">) {
  const [{ isDragging }, refDrag] = useDrag(() => ({
    type: DragDropItems.TASK,
    item: { id, status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const navigate = useNavigate();

  return (
    <div
      className="task"
      ref={(node) => {
        refDrag(node);
      }}
      onClick={() => navigate(`tasks/${id}`)}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <h4>{title}</h4>
    </div>
  );
}

export default Task;
