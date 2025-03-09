import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthPage.css';
import { routes } from '../utils/constants';

/**
 * MainPage Component
 * Displays the main page with two buttons for "Log In" and "Sign Up".
 */
const MainPage = () => {
  const navigate = useNavigate();

  // Navigate to the login page
  const handleLogin = () => {
    navigate(routes.login);
  };

  // Navigate to the signup page
  const handleSignUp = () => {
    navigate(routes.signup);
  };

  return (
    <div className="main-page-container">
      <h1>Welcome to the Game</h1>
      <div className="button-container">
        <button onClick={handleLogin} className="btn">
          Log In
        </button>
        <button onClick={handleSignUp} className="btn">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default MainPage;
