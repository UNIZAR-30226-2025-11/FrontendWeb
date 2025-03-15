import React, { useState, useEffect } from "react";
import userIcon from '../../assets/Icon.png';
import coinsIcon from '../../assets/coins.png';
import '../styles/userbar.css';
import { useNavigate } from 'react-router-dom';
import {routes} from '../utils/constants';

/**
 * Defines the HTML for create a user bar with the
 * name of the user and the coins he has.
 * 
 * @param {*} username The name of the user
 * @param {*} coins The number of coins he has.
 * 
 * @returns The user bar
 */
const UserBar = ({ username, coins }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // add logic
    navigate(routes.login);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.querySelector(".side-menu");
      const icon = document.querySelector(".user-icon");

      if (menu && !menu.contains(event.target as Node) && icon !== event.target) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  return (
    <>
    <div className="user-bar">

      {/* Coins */}
      <div className="coins-info">

        {/* Number */}
        <span className="coins">{coins}</span>

        {/* Icon */}
        <img src={coinsIcon} alt="User coins" className="coins-icon" />
      </div>

      {/* User information */}
      <div className="user-info" onClick={toggleMenu}>
        {/* User icon */}
        <img src={userIcon} alt="User Icon" className="user-icon" />

        {/* Username */}
        <span className="username">{username}</span>
      </div>
    </div>

    {/* Side Menu */}
    <div className={`side-menu ${isOpen ? "open" : ""}`}>
      <ul>
        <button className="menu-btn" onClick={() => navigate(routes.gamemenu)}>
          Back to menu
        </button>
        <button className="menu-btn" onClick={() => navigate(routes.statistics)}>
          Statistics
        </button>
        <button className="menu-btn" onClick={() => navigate(routes.chgpassw)}>
          Edit Profile
          </button>
        <button className="menu-btn logout" onClick={handleLogout}>
          Log Out
          </button>
      </ul>
    </div>
  </>
  );
};

export default UserBar;
