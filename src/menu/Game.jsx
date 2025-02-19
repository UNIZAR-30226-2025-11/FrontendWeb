import React from 'react';
import { useNavigate } from 'react-router-dom';

const Game = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Page de Jeu</h1>
      <p>Bienvenue sur la page du jeu ! Ici, vous pourrez jouer et découvrir de nouvelles aventures.</p>
      <button
        onClick={() => navigate('/')}
      >
        Retour au Menu
      </button>
    </div>
  );
};

export default Game;
