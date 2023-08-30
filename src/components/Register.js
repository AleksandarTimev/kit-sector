import React, { useState } from "react";
import { register } from "../services/authService.js"
import { Link, useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await register(email, password, confirmPassword, gender)
    navigate('/');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="container-form">
      <div className="heading-one" data-cy="cy-register">
        <h1>Register</h1>
      </div>
        <div className="form-group" data-cy="cy-email">
          <label className="navbar-nav ml-auto" htmlFor="username">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group" data-cy="cy-pass">
          <label className="navbar-nav ml-auto" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group" data-cy="cy-pass-confirm">
          <label className="navbar-nav ml-auto" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="navbar-nav ml-auto" htmlFor="gender">
            Gender
          </label>
          <select
            className="form-control"
            id="gender"
            data-cy="cy-gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="male" data-cy="cy-g-male">Male</option>
            <option value="female" data-cy="cy-g-female">Female</option>
            <option value="other" data-cy="cy-g-other">Other</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary register" data-cy="cy-submit">
          Register
        </button>
        <p className="mt-3 text-center" data-cy="cy-login">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
