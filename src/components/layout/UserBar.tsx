import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {routes} from '../../utils/constants';
import { handleLogoutAPI } from "../../services/apiService";
import FriendsList from "./FriendsList";
import { UserContextType, useUser } from '../../context/UserContext';
import { useNotification } from '../../context/NotificationContext';

/**
 * Defines the HTML for creating a user bar with the
 * name of the user and the coins they have.
 * 
 * @param {string} username The name of the user
 * @param {number} coins The number of coins they have.
 * 
 * @returns The user bar component
 */
const UserBar = ({}: {}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isFriendsListOpen, setIsFriendsListOpen] = useState(false);

  const userContext: UserContextType = useUser();

  const { showToast } = useNotification(); // Assuming you have a toast context or similar for notifications
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    const result = await handleLogoutAPI();
    setIsLoading(false);

    // Use the showToast function from the context
    showToast({
      message: result.message,
      type: result.type,
      duration: result.displayTime || 3000, // Default duration if not provided
    });

    if (result.redirectPath) {
      // Navigate after a short delay to allow user to see the success message
      setTimeout(() => {
        window.location.reload(); // Reload the page to ensure the user is logged out
        navigate(result.redirectPath!);
      }, result.displayTime || 3000);
    }
  };

  const coins = userContext.user?.coins;
  const username = userContext.user?.username;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openFriendsList = () => {
    setIsFriendsListOpen(true);
    setIsOpen(false);
  };

  const closeFriendsList = () => {
    setIsFriendsListOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.querySelector(".side-menu");
      const userInfo = document.querySelector(".user-info");

      if (menu && !menu.contains(event.target as Node) && 
          userInfo && !userInfo.contains(event.target as Node)) {
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
        <div className="coins-container">
          <div className="coins-info">
            <span className="coins">{coins}</span>
            <div className="coins-icon-wrapper">
              <img alt="User coins" className="coins-icon" src="../../../assets/coins.png"/>
            </div>
          </div>
        </div>

        {/* User information */}
        <div className="user-info" onClick={toggleMenu}>
          <div className="user-avatar">
            <img alt="User Icon" className="user-icon" />
          </div>
          <span className="username">{username}</span>
          <div className="dropdown-arrow"></div>
        </div>
      </div>

      {/* Side Menu */}
      <div className={`side-menu ${isOpen ? "open" : ""}`}>
        <div className="menu-header">
          <div className="user-avatar menu-avatar">
            <img alt="User Icon" className="user-icon" />
          </div>
          <h3 className="menu-username">{username}</h3>
        </div>
        
        <ul className="menu-items">
          <li>
            <button className="menu-btn home-btn" onClick={() => navigate(routes.gamemenu)}>
              <span className="btn-icon">🏠</span>
              <span className="btn-text">Back to Menu</span>
            </button>
          </li>
          <li>
            <button className="menu-btn stats-btn" onClick={() => navigate(routes.statistics)}>
              <span className="btn-icon">📊</span>
              <span className="btn-text">Statistics</span>
            </button>
          </li>
          <li>
            <button className="menu-btn profile-btn" onClick={() => navigate(routes.chgpassw)}>
              <span className="btn-icon">✏️</span>
              <span className="btn-text">Edit Profile</span>
            </button>
          </li>
          <li>
            <button className="menu-btn friends-btn" onClick={openFriendsList}>
              <span className="btn-icon">👥</span>
              <span className="btn-text">Friends</span>
            </button>
          </li>
          <li className="menu-divider"></li>
          <li>
            <button className="menu-btn logout-btn" onClick={handleLogout}>
              <span className="btn-icon">🚪</span>
              <span className="btn-text">Log Out</span>
            </button>
          </li>
        </ul>
      </div>

      {isFriendsListOpen && (
        <FriendsList onClose={closeFriendsList} />
      )}
    </>
  );
};

export default UserBar;