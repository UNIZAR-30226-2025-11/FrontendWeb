import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>User profile</h1>
      <p>Welcome to your profile! Here you can view and modify your personal information.</p>
      <button
        onClick={() => navigate('/')}
      >
        Back to menu
      </button>
    </div>
  );
};

export default Profile;
