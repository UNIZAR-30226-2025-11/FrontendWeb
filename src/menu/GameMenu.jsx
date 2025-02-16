// GameMenu.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const GameMenu = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/game');
  };

  const handleUserProfile = () => {
    navigate('/profile');
  };

  const handleLogin = () => {
    // On passe un paramètre dans l'URL pour indiquer l'onglet à afficher
    navigate('/auth?tab=login');
  };

  const handleSignUp = () => {
    // On passe un paramètre dans l'URL pour indiquer l'onglet à afficher
    navigate('/auth?tab=signup');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-500 to-indigo-600 p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Exploding Kittens</h1>
      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <button
          className="w-full text-lg bg-white text-purple-600 p-2 rounded-xl shadow-lg hover:bg-purple-100"
          onClick={handleStartGame}
        >
          Start Game
        </button>
        <button
          className="w-full text-lg bg-transparent border-2 border-white text-white p-2 rounded-xl shadow-lg hover:bg-white hover:text-purple-600"
          onClick={handleUserProfile}
        >
          User Profile
        </button>
        <button
          className="w-full text-lg bg-blue-500 text-white p-2 rounded-xl shadow-lg hover:bg-blue-600"
          onClick={handleLogin}
        >
          Log In
        </button>
        <button
          className="w-full text-lg bg-green-500 text-white p-2 rounded-xl shadow-lg hover:bg-green-600"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default GameMenu;
