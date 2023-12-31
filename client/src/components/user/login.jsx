import { useForm } from "react-hook-form";
import React, { useState } from "react";
import "@/assets/styles/login.css"; // Import your styles here
import { userLogin } from "@/api/api"; // Import userLogin instead of userSignup

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await userLogin({
        // use userLogin instead of userSignup
        email: data.email,
        password: data.password,
      });
      console.log(response);
      setErrorMessage("Success"); // Clear any previous error message
    } catch (error) {
      console.error("Error logging in: ", error);
      setErrorMessage(
        error.response.data.message || "Unexpected error occurred"
      ); // Display the error message from API or a default one
    }
  };

  return (
    <>
      <div className="login-container">
        <h2>Login</h2>
        {/* Display the error message */}
        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}{" "}
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            defaultValue=""
            {...register("email")}
            placeholder="Enter your email"
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: true })}
            placeholder="Enter your password"
          />
          {errors.password && <span>This field is required</span>}
          <input type="submit" value="Login" />
        </form>
      </div>
      <div></div>
    </>
  );
}

export default Login;
