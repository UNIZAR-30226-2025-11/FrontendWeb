import React, { useState } from 'react';
import './ChangePassword.css';
import { handleConfirmChange, handleDeleteAccout } from '../../services/apiService';


const ChangePasswordPage = (
  {} : {}) => {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="title">Change Password</h1>
        <div className="input-container">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="repeatPassword">Repeat Password:</label>
          <input
            type="password"
            id="repeatPassword"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button className="button confirm" onClick={() => handleConfirmChange(newPassword, repeatPassword)}>
            Confirm Change
          </button>
          <button className="button delete" onClick={handleDeleteAccout}>
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default ChangePasswordPage;
