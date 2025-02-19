import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Profil Utilisateur</h1>
      <p>Bienvenue sur votre profil ! Ici, vous pouvez consulter et modifier vos informations personnelles.</p>
      <button
        onClick={() => navigate('/')}
      >
        Retour au Menu
      </button>
    </div>
  );
};

export default Profile;
