// GameMenu.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/GameMenu.jpg';
import './GameMenu.css';

const GameMenu = () => {
  const navigate = useNavigate();
  
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
        <button className="button button-white" onClick={() => navigate('/game')}>
          Start Game
        </button>
        <button className="button button-transparent" onClick={() => navigate('/profile')}>
          User Profile
        </button>
        <button className="button button-blue" onClick={() => navigate('/auth?tab=login')}>
          Log In
        </button>
        <button className="button button-green" onClick={() => navigate('/auth?tab=signup')}>
          Sign Up
        </button>
        <button className="button button-purple" onClick={() => navigate('/shop')}>
          Shop
        </button>
      </div>
    </div>
  );
};

export default GameMenu;
