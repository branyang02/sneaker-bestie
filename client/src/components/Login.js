import React, { useState } from 'react';
import { userLogin } from '../api/api';

function Login() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: ""
  });

  const handleInputChange = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await userLogin(userDetails);
      console.log(response); // Handle response
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" onChange={handleInputChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" onChange={handleInputChange} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
