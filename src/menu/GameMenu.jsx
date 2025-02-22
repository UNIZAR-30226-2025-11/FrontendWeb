// GameMenu.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '/Users/johan/Desktop/FrontendWeb/src/assets/GameMenu.jpg';
import './GameMenu.css';

const GameMenu = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/game');
  };

  const handleUserProfile = () => {
    navigate('/profile');
  };

  const handleLogin = () => {
    navigate('/auth?tab=login');
  };

  const handleSignUp = () => {
    navigate('/auth?tab=signup');
  };

  return (
    <div className="container" 
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      width: '100vw',
      marginLeft: '-80px',
    }}>
      <div className="menu">
        <button className="button button-white" onClick={handleStartGame}>
          Start Game
        </button>
        <button className="button button-transparent" onClick={handleUserProfile}>
          User Profile
        </button>
        <button className="button button-blue" onClick={handleLogin}>
          Log In
        </button>
        <button className="button button-green" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default GameMenu;
