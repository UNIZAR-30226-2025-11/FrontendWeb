import React, { useState } from 'react';
import '../styles/ChangePassword.css';

interface ChangePasswordProps {
  username?: string;
}

const ChangePasswordPage: React.FC<ChangePasswordProps> = ({ username }) => {
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleConfirmChange = () => {
    if (newPassword !== repeatPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Add logic here to update the password
    alert("Password successfully changed!");
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="title">Change Password</h1>
        <p className="username">Username: <strong>{username}</strong></p>
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
        <button className="button button-primary" onClick={handleConfirmChange}>
          Confirm Change
        </button>
      </div>
    </div>
  );
  
};

export default ChangePasswordPage;
