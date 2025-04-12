import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSignUp } from "../../services/apiService";

export const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password2: "",
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
          handleSignUp(
            formData.username,
            formData.password,
            formData.password2,
            navigate
          );
        }}
      >
        <div className="input-group">
          <label htmlFor="signup-username">Username</label>
          <input
            type="text"
            id="signup-username"
            name="username"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="signup-password">Password</label>
          <input
            type="password"
            id="signup-password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="signup-password2">Confirm Password</label>
          <input
            type="password"
            id="signup-password2"
            name="password2"
            placeholder="Confirm your password"
            value={formData.password2}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="GC-button signup-btn"
        >
          <span className="GC-button-text">Create Account</span>
        </button>
      </form>
    </div>
  );
};