import React, { useState, useEffect } from 'react';
import { Navbar } from './Navigation';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";

export const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password, gender);
      // User has been registered successfully
      alert('User registered successfully!');
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
    <Navbar />
    <form onSubmit={handleSubmit} className="container-form" >
      <div className="form-group">
        <label className="navbar-nav ml-auto" htmlFor="username">Email</label>
        <input
          type="text"
          id="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="navbar-nav ml-auto" htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="navbar-nav ml-auto" htmlFor="confirmPassword">Confirm Password</label>
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
        <label className="navbar-nav ml-auto" htmlFor="gender">Gender</label>
        <select className="form-control" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Register</button>
    </form>
    </div>
  );
};

export default RegisterForm;