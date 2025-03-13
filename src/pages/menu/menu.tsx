import React, { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {routes} from '../../utils/constants';
import Lobby from '../../components/lobby/Lobby';

import './menu.css';
import LobbyUsers from '../../components/lobby/LobbyUsers';
import { useSocketHandlers } from '../../hooks/useSocket';

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
