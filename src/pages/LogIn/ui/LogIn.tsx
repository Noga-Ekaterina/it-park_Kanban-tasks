import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "src/api";
interface LogInInputs {
  username: string;
  password: string;
}

export function LogIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LogInInputs>();
  async function onSubmit(data: LogInInputs): Promise<void> {
    console.log(data);
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
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2 className="login-title">Sign in to your account</h2>
        </div>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="form-group-login">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              type="username"
              autoComplete="username"
              required
              className="form-input"
              placeholder="Username"
              {...register("username")}
            />
            {errors.username && (
              <p
                role="alert"
                style={{
                  color: "var(--red)",
                  fontSize: "0.8rem",
                  marginTop: "0.25rem",
                }}
              >
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="form-group-login">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              className="form-input"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p
                role="alert"
                style={{
                  color: "var(--red)",
                  fontSize: "0.8rem",
                  marginTop: "0.25rem",
                }}
              >
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="form-group-login">
            <button type="submit" className="login-button">
              Sign in
            </button>
          </div>
        </form>

        <div className="login-footer">
          Don't have an account?{" "}
          <Link to="/signUp">
            <a className="login-link">Sign up</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
