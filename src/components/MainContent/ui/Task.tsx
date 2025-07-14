import { useDrag } from "react-dnd";
import { DragDropItems } from "../../../ DragDropItems";
import type { TaskType } from "../../../types/types.ts";

function Task({ title, id, status }: Omit<TaskType, "description">) {
  const [{ isDragging }, refDrag] = useDrag(() => ({
    type: DragDropItems.TASK,
    item: { id, status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      className="task"
      ref={(node) => {
        refDrag(node);
      }}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <h4>{title}</h4>
    </div>
  );
}

export default Task;
