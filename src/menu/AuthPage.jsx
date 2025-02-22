// AuthPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Logged in');
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    console.log('Registered');
  };

  return (
    <div>
      <h1>PLACEHOLDER PLACEHOLDER PLACEHOLDER</h1>
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
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
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
              <label>Password</label>
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
      <button onClick={() => navigate('/')}>
      Return to menu
      </button>
    </div>
  );
};

export default AuthPage;