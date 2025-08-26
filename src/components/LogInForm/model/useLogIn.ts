import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { logIn } from "../../../api";

interface LogInInputs {
  username: string;
  password: string;
}

export function useLogIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LogInInputs>();

  async function onSubmit(data: LogInInputs): Promise<void> {
    const token = await logIn(data.username, data.password);
    if (typeof token === "string") {
      localStorage.setItem("token", token);
      navigate("/");
    } else {
      setError("password", {
        type: "custom",
        message: "Try different password or username",
      });
      console.log("Could not obtain token");
    }
  }

  return { register, handleSubmit, errors, onSubmit };
}
