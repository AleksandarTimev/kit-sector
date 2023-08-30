import React, { useState } from "react";
import { login } from "../services/authService.js";
import { Link, useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await login(email, password)
    navigate('/');
  }

  return (
    <div>
    <form className="container-form" onSubmit={handleSubmit} >
    <h1>Login</h1>
      <div className="form-group" data-cy="cy-email-login">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="form-control"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div className="form-group" data-cy="cy-pass-login">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary login" data-cy="cy-submit-login">
        Login
      </button>
      <p className="mt-3 text-center">
          Don't have an account yet? <Link to="/register">Register</Link>
        </p>
    </form>
    </div>
  );
};

export default LoginForm;