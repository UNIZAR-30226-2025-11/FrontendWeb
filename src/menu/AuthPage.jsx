// AuthPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Ici, vous ajouterez la logique de connexion
    console.log('Connexion effectuée');
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    // Ici, vous ajouterez la logique d'inscription
    console.log('Inscription effectuée');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-500 to-blue-600 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        {/* Boutons de sélection */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 rounded ${isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Log In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 rounded ${!isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Sign Up
          </button>
        </div>

        {/* Formulaire de connexion ou d'inscription */}
        {isLogin ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Entrez votre email"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Mot de passe</label>
              <input
                type="password"
                placeholder="Entrez votre mot de passe"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Log In
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignUpSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Nom d'utilisateur</label>
              <input
                type="text"
                placeholder="Choisissez un nom d'utilisateur"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Entrez votre email"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Mot de passe</label>
              <input
                type="password"
                placeholder="Entrez votre mot de passe"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Sign Up
            </button>
          </form>
        )}
      </div>

      {/* Bouton pour revenir au menu */}
      <button onClick={() => navigate('/')} className="mt-4 text-blue-500 hover:underline">
        Retour au Menu
      </button>
    </div>
  );
};

export default AuthPage;
