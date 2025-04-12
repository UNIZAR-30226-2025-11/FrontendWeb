import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleSignUp } from "../../services/apiService";

export const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password2: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [formTouched, setFormTouched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setFormTouched(true);
  };

  useEffect(() => {
    // Only check match if both fields have values
    if (formData.password && formData.password2) {
      setPasswordsMatch(formData.password === formData.password2);
    } else {
      // Don't show error when fields are empty
      setPasswordsMatch(true);
    }
  }, [formData.password, formData.password2]);

  return (
    <form
      className="GC-auth-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (passwordsMatch && formData.password) {
          handleSignUp(
            formData.username,
            formData.password,
            formData.password2,
            navigate
          );
        }
      }}
    >
      <div className="GC-input-group">
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

      <div className="GC-input-group">
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

      <div className="GC-input-group">
        <label htmlFor="signup-password2">Confirm Password</label>
        <input
          type="password"
          id="signup-password2"
          name="password2"
          placeholder="Confirm your password"
          value={formData.password2}
          onChange={handleChange}
          required
          className={!passwordsMatch ? "GC-input-error" : ""}
        />
        {formTouched && !passwordsMatch && (
          <div className="GC-error-message">Passwords do not match</div>
        )}
      </div>

      <button
        type="submit"
        className="GC-button GC-red-btn"
        disabled={!passwordsMatch || !formData.username || !formData.password || !formData.password2}
      >
        <span className="GC-button-text">Create Account</span>
      </button>
    </form>
  );
};