import React, { useState, useEffect } from 'react';
import { ApiResponse, handleConfirmChangeAPI, handleDeleteAccountAPI } from '../../services/apiService';
import GlassCard from '../../common/GlassCard/GlassCard';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
import { useUser } from '../../context/UserContext';

import './ChangePassword.css';

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: "",
    repeatPassword: ""
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [formTouched, setFormTouched] = useState(false);

  const { showToast } = useNotification(); // Assuming you have a toast context or similar for notifications

  const userContext = useUser();
  const background:string = userContext.user?.userPersonalizeData.background || "default"; // Default background if not set

  const handleChangePassword = async (newPassword: string, repeatPassword: string) => {
    const result: ApiResponse = await handleConfirmChangeAPI(newPassword, repeatPassword);

    // Use the showToast function from the context
    showToast({
      message: result.message,
      type: result.type,
      duration: result.displayTime || 3000, // Default duration if not provided
    });

    if (result.redirectPath) {
      // Navigate after a short delay to allow user to see the success message
      setTimeout(() => {
        navigate(result.redirectPath!);
      }, result.displayTime || 3000);
    }
  }

  const handleDeleteAccount = async () => {
    const result: ApiResponse = await handleDeleteAccountAPI();

    // Use the showToast function from the context
    showToast({
      message: result.message,
      type: result.type,
      duration: result.displayTime || 3000, // Default duration if not provided
    });

    if (result.redirectPath) {
      // Navigate after a short delay to allow user to see the success message
      setTimeout(() => {
        navigate(result.redirectPath!);
      }, result.displayTime || 3000);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setFormTouched(true);
  };

  useEffect(() => {
    // Only check match if both fields have values
    if (formData.newPassword && formData.repeatPassword) {
      setPasswordsMatch(formData.newPassword === formData.repeatPassword);
    } else {
      // Don't show error when fields are empty
      setPasswordsMatch(true);
    }
  }, [formData.newPassword, formData.repeatPassword]);

  return (
    <GlassCard title="Change Password" minwidth={500} background={background}>
      <form 
        className="GC-auth-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (passwordsMatch && formData.newPassword) {
            handleChangePassword(
              formData.newPassword,
              formData.repeatPassword
            );
          }
        }}
      >
        <div className="GC-input-group">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="GC-input-group">
          <label htmlFor="repeatPassword">Repeat Password:</label>
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            placeholder="Repeat password"
            value={formData.repeatPassword}
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
          className="GC-button GC-blue-btn"
          disabled={!passwordsMatch || !formData.newPassword || !formData.repeatPassword}
        >
          <span className="GC-button-text">Confirm Change</span>
        </button>
      </form>
      <button className="GC-button GC-red-btn" onClick={handleDeleteAccount}>
        <span className="GC-button-text">Delete Profile</span>
      </button>
    </GlassCard>
  );
};

export default ChangePasswordPage;
