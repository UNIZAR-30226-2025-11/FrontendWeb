import React from 'react';
import { useNavigate } from 'react-router-dom';
import {routes} from '../../utils/constants';

import './menu.css';

const GameMenu = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container">
      <div className="menu">
        <button className="button button-white" onClick={() => navigate(routes.game)}>
          Start Game
        </button>
        <button className="button button-transparent" onClick={() => navigate(routes.profile)}>
          User Profile
        </button>
        <button className="button button-purple" onClick={() => navigate(routes.shop)}>
          Shop
        </button>
      </div>
    </div>
  );
};

export default GameMenu;
