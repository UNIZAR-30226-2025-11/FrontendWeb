import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/constants';

import './menu.css';
import { UserContextType, useUser } from '../../context/UserContext';
import CatMascot from './mascot';

const GameMenu = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const userContext: UserContextType = useUser();

  useEffect(() => {
    // Add visible class after component mounts for animation
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
      <div className={`game-content-container ${visible ? 'visible' : ''}`}>
        <div className="logo-container">
          <h1 className="game-title">Exploding Kittens</h1>
          <div className="paw-print paw-print-1"></div>
          <div className="paw-print paw-print-2"></div>
          <div className="paw-print paw-print-3"></div>
        </div>
        
        <div className="game-mascot">
        <CatMascot />
        </div>

        <p className="game-description">Embark on an exciting adventure! Play, win and collect rewards.</p>
        
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-icon">🏆</div>
            <div className="stat-info">
              <div className="stat-label">Wins</div>
              <div className="stat-value">{userContext.user?.games_won}</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <div className="stat-label">Coins</div>
              <div className="stat-value">{userContext.user?.coins}</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">🎮</div>
            <div className="stat-info">
              <div className="stat-label">Games</div>
              <div className="stat-value">{userContext.user?.games_played}</div>
            </div>
          </div>
        </div>

        <div className="button-container">
          <button 
            className="welcome-button login-btn"
            onClick={() => navigate(routes.game)}
          >
            <span className="button-text">Start Adventure</span>
          </button>
          
          <button 
            className="welcome-button signup-btn"
            onClick={() => navigate(routes.shop)}
          >
            <span className="button-text">Visit Shop</span>
          </button>
        </div>
      </div>        
  );
};

export default GameMenu;
