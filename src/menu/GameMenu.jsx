// GameMenu.jsx
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/GameMenu.jpg';
import '../styles/GameMenu.css';
import {routes} from '../.constants.jsx'

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
    }}>
      <div className="menu">
        <button className="button button-white" onClick={() => navigate(routes.game)}>
          Start Game
        </button>
        <button className="button button-transparent" onClick={() => navigate(routes.profile)}>
          User Profile
        </button>
        <button className="button button-blue" onClick={() => navigate(routes.login)}>
          Log In
        </button>
        <button className="button button-green" onClick={() => navigate(routes.signup)}>
          Sign Up
        </button>
        <button className="button button-purple" onClick={() => navigate(routes.shop)}>
          Shop
        </button>
      </div>
    </div>
  );
};

export default GameMenu;
