// AuthPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('connection performed');
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    console.log('Registration completed');
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
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label>Mot de passe</label>
              <input
                type="password"
                placeholder="Enter your password"
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
                placeholder="Choose a user name"
                required
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label>Mot de passe</label>
              <input
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit">
              Sign Up
            </button>
          </form>
        )}
      </div>
      <button onClick={() => navigate('/gamemenu')}>
        Back to menu
      </button>
    </div>
  );
};

export default AuthPage;