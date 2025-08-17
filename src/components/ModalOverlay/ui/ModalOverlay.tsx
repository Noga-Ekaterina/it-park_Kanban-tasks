import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import closeIcon from "@/assets/icon-cross.svg";

type FormData = {
  title: number;
  description: string;
  status: Status;
};

type Status = "todo" | "doing" | "done";

export function ModalOverlay() {
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="modal-overlay">
      {/* <!-- Add Task Modal --> */}
      <div className="modal add-task-modal">
        <div className="modal-header">
          <h2>Add New Task</h2>
          <button className="close-modal">
            <img src={closeIcon} alt="Close" />
          </button>
        </div>

        <form id="add-task-form" onSubmit={handleSubmit(onSubmit)}>
          {/* <!-- Task Title --> */}
          <div className="form-group">
            <label htmlFor="task-title">Title</label>
            <input
              type="text"
              id="task-title"
              placeholder="e.g. Take coffee break"
              {...register("title", {
                required: true,
              })}
            />
          </div>

          {/* <!-- Task Description --> */}
          <div className="form-group">
            <label htmlFor="task-description">Description</label>
            <textarea
              id="task-description"
              placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
              {...register("description")}
            ></textarea>
          </div>

          {/* <!-- Status --> */}
          <div className="form-group">
            <label htmlFor="task-status">Status</label>
            <select id="task-status" {...register("status")}>
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>

          {/* <!-- Submit Button --> */}
          <button type="submit" className="btn-primary">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}
