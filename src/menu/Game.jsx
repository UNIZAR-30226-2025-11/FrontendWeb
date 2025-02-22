import React from 'react';
import { useNavigate } from 'react-router-dom';

const Game = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Game page</h1>
      <p>PLACEHOLDER PLACEHOLDER PLACEHOLDER</p>
      <button
        onClick={() => navigate('/')}
      >
        Return to menu
      </button>
    </div>
  );
};

export default Game;
