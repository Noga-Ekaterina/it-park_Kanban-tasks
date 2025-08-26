import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signUp } from "../../../api";

interface LogInInputs {
  username: string;
  password: string;
  repeatPassword: string;
}

export function useSignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LogInInputs>();
  async function onSubmit(data: LogInInputs): Promise<void> {
    console.log(data);
    const token = await signUp(data.username, data.password);
    if (typeof token === "string") {
      localStorage.setItem("token", token);
      navigate("/");
    } else {
      console.log("Could not obtain token");
    }
  }

  return { register, handleSubmit, errors, watch, onSubmit };
}
