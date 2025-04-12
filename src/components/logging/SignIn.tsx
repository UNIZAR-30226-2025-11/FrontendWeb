import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogIn } from '../../services/apiService';

export const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="form-comp">
      <form 
        className="auth-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogIn(
            formData.username,
            formData.password,
            navigate
          );
        }}
      >
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="welcome-button login-btn"
        >
          <span className="button-text">Log In</span>
        </button>
      </form>
    </div>
  );
};