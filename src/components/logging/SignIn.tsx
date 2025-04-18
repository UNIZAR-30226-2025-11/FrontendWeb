import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiResponse, handleLogInAPI } from '../../services/apiService';
import { useNotification } from '../../context/NotificationContext';
import { UserContextType, useUser } from '../../context/UserContext';
import { useSocket } from '../../context/SocketContext';

export const SignIn = () => {
  const navigate = useNavigate();
  const { showToast } = useNotification(); // Assuming you have a toast context or similar for notifications
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const userContext: UserContextType = useUser();

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    const result: ApiResponse = await handleLogInAPI(formData.username, formData.password);

    setIsLoading(false);

    // Use the showToast function from the context
    showToast({
      message: result.message,
      type: result.type,
      duration: result.displayTime || 3000, // Default duration if not provided
    });

    if (result.redirectPath) {
      // Navigate after a short delay to allow user to see the success message
      setTimeout(async () => {
        await userContext.refreshUser(); // Refresh user data after login
        window.location.reload(); // Reload the page to reflect changes
        navigate(result.redirectPath!);
      }, result.displayTime || 3000);
    }
  };

  return (
    <div className="GC-form-comp">
      <form 
        className="GC-auth-form"
        onSubmit={handleSubmit}
      >
        <div className="GC-input-group">
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

        <div className="GC-input-group">
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
          className="GC-button GC-red-btn"
        >
          <span className="GC-button-text">Log In</span>
        </button>
      </form>
    </div>
  );
};