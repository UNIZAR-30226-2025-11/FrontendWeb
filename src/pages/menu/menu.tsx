import React, { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {routes} from '../../utils/constants';
import Lobby from '../../components/lobby/Lobby';

import './menu.css';
import LobbyUsers from '../../components/lobby/LobbyUsers';

const GameMenu = () => {
  const navigate = useNavigate();

  const [lobbyVisible, setLobbyVisible] = useState(false);
  const [lobbyListVisible, setLobbyListVisible] = useState(false);

  const [owner, setOwner] = useState(false)
  
  return (
    <div className="container">
      {lobbyVisible && <Lobby setLobbyVisible={setLobbyVisible}
                              setLobbyListVisible={setLobbyListVisible}
                              setOwner={setOwner} /> }
      {lobbyListVisible && <LobbyUsers lobbyID='123' owner={owner}/> }
      <div className="menu">
        <button className="button button-white" onClick={() => setLobbyVisible(true)}>
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
