import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Your profile</h1>
      <p>PLACEHOLDER PLACEHOLDER PLACEHOLDER</p>
      <button
        onClick={() => navigate('/')}
      >
        Return to menu
      </button>
    </div>
  );
};

export default Profile;
