import { Link } from "react-router-dom";
import { isUsernameFree } from "src/api";
import { useSignUp } from "../model/useSignUp.ts";

export function SignUpForm() {
  const { register, handleSubmit, errors, watch, onSubmit } = useSignUp();

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2 className="login-title">Sign up for a new account</h2>
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
              {...register("username", {
                validate: async function checkUsername(
                  username: string,
                ): Promise<boolean | string> {
                  const flag = await isUsernameFree(username);
                  console.log(flag);
                  if (typeof flag === "boolean") {
                    return (
                      flag || "This username is already taken. Try another one!"
                    );
                  } else {
                    console.log(
                      "Validation failed, so for that reason we cannot allow to authenticate user",
                    );
                    return "Server error while validating";
                  }
                },
              })}
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
          </div>
          <div className="form-group-login">
            <label htmlFor="repeat-password" className="form-label">
              Repeat password
            </label>
            <input
              id="repeat-password"
              type="password"
              autoComplete="current-password"
              required
              className="form-input"
              placeholder="Repeat password"
              {...register("repeatPassword", {
                validate: function checkRepeatPassword(
                  repeatPassword: string,
                ): boolean | string {
                  return (
                    repeatPassword === watch("password") ||
                    "Your passwords dont match"
                  );
                },
              })}
            />
            {errors.repeatPassword && (
              <p
                role="alert"
                style={{
                  color: "var(--red)",
                  fontSize: "0.8rem",
                  marginTop: "0.25rem",
                }}
              >
                {errors.repeatPassword.message}
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
          Already have an account?{" "}
          <Link to="/logIn" className="login-link">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
