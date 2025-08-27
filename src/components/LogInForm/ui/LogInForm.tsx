import { Link } from "react-router-dom";
import { useLogIn } from "../model/useLogIn.ts";

export function LogInForm() {
  const { register, handleSubmit, errors, onSubmit } = useLogIn();

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
          <Link to="/signUp" className="login-link">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
