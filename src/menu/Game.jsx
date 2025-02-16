import React from 'react';
import { useNavigate } from 'react-router-dom';

const Game = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Page de Jeu</h1>
      <p>Bienvenue sur la page du jeu ! Ici, vous pourrez jouer et découvrir de nouvelles aventures.</p>
      <button
        onClick={() => navigate('/')}
        className="mt-4 text-lg bg-blue-500 text-white p-2 rounded-xl shadow-lg hover:bg-blue-600"
      >
        Retour au Menu
      </button>
    </div>
  );
};

export default Game;
