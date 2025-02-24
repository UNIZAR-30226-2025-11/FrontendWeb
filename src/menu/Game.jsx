import React from 'react';
import { useNavigate } from 'react-router-dom';

const Game = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Game page</h1>
      <p>Welcome to the game page! Here you can play and discover new adventures.</p>
      <button
        onClick={() => navigate('/gamemenu')}
      >
        Back to Menu
      </button>
    </div>
  );
};

export default Game;
