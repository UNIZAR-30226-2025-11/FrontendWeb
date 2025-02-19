// AuthPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Connexion effectuée');
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    console.log('Inscription effectuée');
  };

  return (
    <div>
      <div>
        <div>
          <button
            onClick={() => setIsLogin(true)}
          >
            Log In
          </button>
          <button
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>
        {isLogin ? (
          <form onSubmit={handleLoginSubmit}>
            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="Entrez votre email"
                required
              />
            </div>
            <div>
              <label>Mot de passe</label>
              <input
                type="password"
                placeholder="Entrez votre mot de passe"
                required
              />
            </div>
            <button type="submit">
              Log In
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignUpSubmit}>
            <div>
              <label>Nom d'utilisateur</label>
              <input
                type="text"
                placeholder="Choisissez un nom d'utilisateur"
                required
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="Entrez votre email"
                required
              />
            </div>
            <div>
              <label>Mot de passe</label>
              <input
                type="password"
                placeholder="Entrez votre mot de passe"
                required
              />
            </div>
            <button type="submit">
              Sign Up
            </button>
          </form>
        )}
      </div>
      <button onClick={() => navigate('/')}>
        Retour au Menu
      </button>
    </div>
  );
};

export default AuthPage;