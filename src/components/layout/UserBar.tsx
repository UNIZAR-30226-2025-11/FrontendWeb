import React, { useState, useEffect } from "react";
import userIcon from '../../../assets/Icon.png';
import coinsIcon from '../../../assets/coins.png';
import './userbar.css';
import { useNavigate } from 'react-router-dom';
import {routes} from '../../utils/constants';
import { SERVER } from "../../utils/config";

/**
 * Defines the HTML for create a user bar with the
 * name of the user and the coins he has.
 * 
 * @param {*} username The name of the user
 * @param {*} coins The number of coins he has.
 * 
 * @returns The user bar
 */
const UserBar = (
  {
  username,
  coins
  } : {
  username:string,
  coins:number
  }) =>
{
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {

    const response = await fetch(SERVER + routes.logout,
      {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      }
    )

    console.log(response)

    if (response.status == 200)
      navigate(routes.login);
    else
      console.log("Something didn't work...")
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
