import React from 'react';
import { useNavigate } from 'react-router-dom';
import {routes} from '../../utils/constants';

import './menu.css';
import SelectUser from '../../components/game/SelectUser';

const GameMenu = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container">
      <div className="menu">
        <button className="button button-white" onClick={() => navigate(routes.game)}>
          New Game
        </button>
        <button className="button button-white" onClick={() => navigate(routes.game)}>
          Join Game
        </button>
        <button className="button button-white" onClick={() => navigate(routes.shop)}>
          Shop
        </button>
      </div>
    </div>
  );
};

export default GameMenu;
