import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/constants';

import './menu.css';
import { UserContextType, useUser } from '../../context/UserContext';
import CatMascot from './mascot';
import GlassCard from '../../common/GlassCard/GlassCard';
import { fetchUser } from '../../services/apiService';

const GameMenu = () => {
  const navigate = useNavigate();

  const userContext: UserContextType = useUser();
  const background: string = userContext.user?.userPersonalizeData.background || "default";

  useEffect(() => {
      fetchUser(userContext.setUser,
                userContext.setIsLoading);
  },[])

  return (
      <GlassCard title="Welcome Back!" minwidth={500} background={background}>
        
        <div className="menu-mascot">
          <CatMascot />
        </div>
        <p className="menu-description">Embark on an exciting adventure! Play, win and collect rewards.</p>
        <div className="menu-stats-container">
          <div className="menu-stat-item">
            <div className="menu-stat-icon">🏆</div>
            <div className="menu-stat-info">
              <div className="menu-stat-label">Wins</div>
              <div className="menu-stat-value">{userContext.user?.statistics.gamesWon}</div>
            </div>
          </div>
          <div className="menu-stat-item">
            <div className="menu-stat-icon">💰</div>
            <div className="menu-stat-info">
              <div className="menu-stat-label">Coins</div>
              <div className="menu-stat-value">{userContext.user?.coins}</div>
            </div>
          </div>
          <div className="menu-stat-item">
            <div className="menu-stat-icon">🎮</div>
            <div className="menu-stat-info">
              <div className="menu-stat-label">Games</div>
              <div className="menu-stat-value">{userContext.user?.statistics.gamesPlayed}</div>
            </div>
          </div>
        </div>

        <div className="GC-button-container">
          <button 
            className="GC-button GC-red-btn"
            onClick={() => navigate(routes.game)}
          >
            <span className="GC-button-text">Start Adventure</span>
          </button>
          
          <button 
            className="GC-button GC-blue-btn"
            onClick={() => navigate(routes.shop)}
          >
            <span className="GC-button-text">Visit Shop</span>
          </button>
        </div>       
      </GlassCard>

  );
};

export default GameMenu;
