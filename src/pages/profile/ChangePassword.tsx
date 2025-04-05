import React, { useState } from 'react';
import './ChangePassword.css';
import { SERVER } from '../../utils/config';
import { routesRequest } from '../../utils/constants';
import { UserContextType, useUser } from '../../context/UserContext';


const ChangePasswordPage = (
  {} : {}) => {
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const userContext: UserContextType = useUser();
  const username = userContext.user?.username!;

  const handleConfirmChange = async () => {
    if (newPassword !== repeatPassword) {
      alert("Passwords do not match!");
      return;
    }

    const response = await fetch(SERVER + routesRequest.user,
      {
        mode: "cors",
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          password: newPassword
        }),
      }
    )

    console.log(response)

    if (response.status == 200)
      alert("Password successfully changed!");
    else if (response.status == 401)
      alert("Something went wrong with JWT")
    else
      alert("Something went wrong...")
  };

  const handleDelete = async () => {

    const response = await fetch(SERVER + routesRequest.user,
      {
        mode: "cors",
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
      }
    )

    if (response.status == 200)
    {
      alert("Profile deleted!");
      window.location.reload();
    }
      
    else if (response.status == 401)
      alert("Something went wrong with JWT");
    else
      alert("Something went wrong...")

  };

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
          <button className="button confirm" onClick={handleConfirmChange}>
            Confirm Change
          </button>
          <button className="button delete" onClick={handleDelete}>
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default ChangePasswordPage;
