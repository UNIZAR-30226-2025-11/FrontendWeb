import React, { useState } from 'react';
import './ChangePassword.css';
import { handleConfirmChange, handleDeleteAccout } from '../../services/apiService';
import GlassCard from '../../common/GlassCard/GlassCard';


const ChangePasswordPage = (
  {} : {}) => {
  const [formData, setFormData] = useState({
    newPassword: "",
    repeatPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <GlassCard title="Change Password" minwidth={500}>
      <div className="GC-form-comp">
        <form 
          className="GC-auth-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleConfirmChange(formData.newPassword, formData.repeatPassword);
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
            />
          </div>
          <button 
            type="submit" 
            className="GC-button GC-blue-btn"
          >
            <span className="GC-button-text">Confirm Change</span>
          </button>
          <button className="GC-button GC-red-btn" onClick={handleDeleteAccout}>
            Delete Profile
          </button>
        </form>
      </div>
    </GlassCard>
  );
};

export default ChangePasswordPage;