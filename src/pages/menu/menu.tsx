import React from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/constants';

import './menu.css';

const GameMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="menu">
        <button className="button" onClick={() => navigate(routes.game)}>
          Start a Game
        </button>
        <button className="button" onClick={() => navigate(routes.shop)}>
          Shop
        </button>
      </div>
    </div>
  );
};

export default GameMenu;
