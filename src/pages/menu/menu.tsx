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

        <div className="GC-button-container">
          <button 
            className="GC-button GC-red-btn"
            onClick={() => navigate(routes.game)}
          >
            <span className="GC-button-text">Start Adventure</span>
          </button>
          
        </div>       
      </GlassCard>

  );
};

export default GameMenu;
