import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {routes} from '../../utils/constants';
import { handleLogoutAPI } from "../../services/apiService";
import { UserContextType, useUser } from '../../context/UserContext';
import { useNotification } from '../../context/NotificationContext';
import { IMAGES_EXTENSION, IMAGES_PATH } from '../../services/apiShop';
import './userbar.css';

/**
 * Defines the HTML for creating a user bar with the
 * name of the user and the coins they have.
 * 
 * @param {string} username The name of the user
 * @param {number} coins The number of coins they have.
 * 
 * @returns The user bar component
 */
const UserBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomizeHint, setShowCustomizeHint] = useState(false);

  const userContext: UserContextType = useUser();

  const { showToast } = useNotification(); // Assuming you have a toast context or similar for notifications

  const handleLogout = async () => {
    const result = await handleLogoutAPI();

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
  const avatar = userContext.user?.userPersonalizeData.avatar || "default";
  const background: string = userContext.user?.userPersonalizeData.background || "default";
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigateToCustomization = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent menu toggle
    navigate(routes.profilecustomization);
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
      <div className={`user-bar user-bar-${background}`}>
        {/* Coins */}
        <div className="coins-container">
          <div className={`coins-info coins-info-${background}`}>
            <span className="coins">{coins}</span>
            <div className={`coins-icon-wrapper coins-icon-wrapper-${background}`}>
              <img alt="User coins" className="coins-icon" src="../../../assets/coins.png"/>
            </div>
          </div>
        </div>

        {/* User information */}
        <div className={`user-info user-info-${background}`} onClick={toggleMenu}>
          <div 
            className={`user-avatar user-avatar-${background} customizable-avatar`}
            onMouseEnter={() => setShowCustomizeHint(true)}
            onMouseLeave={() => setShowCustomizeHint(false)}
            onClick={navigateToCustomization}
          >
            <img alt="User Icon" className="user-icon" src={`${IMAGES_PATH}/avatar/${avatar}${IMAGES_EXTENSION}`} />
            {showCustomizeHint && (
              <div className="customize-hint">
                <span>✏️ Customize</span>
              </div>
            )}
          </div>
          <span className="username">{username}</span>
          <div className="dropdown-arrow"></div>
        </div>
      </div>

      {/* Side Menu */}
      <div className={`side-menu ${isOpen ? "open" : ""} side-menu-${background}`}>
        <div className={`menu-header menu-header-${background}`}>
          <div
            className={`user-avatar menu-avatar menu-avatar-${background}`}
            onClick={() => {navigate(routes.profilecustomization);}}
          >
            <img
              alt="User Icon"
              className="user-icon"
              src={`${IMAGES_PATH}/avatar/${avatar}${IMAGES_EXTENSION}`}
            />
            <div className="customize-overlay">
              <span className="customize-icon">✏️</span>
              <span className="customize-text">Edit Profile</span>
            </div>
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
            <button className="menu-btn shop-btn" onClick={() => navigate(routes.shop)}>
              <span className="btn-icon">🛒</span>
              <span className="btn-text">Shop</span>
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
              <span className="btn-text">Change Password</span>
            </button>
          </li>
          <li>
            <button className="menu-btn friends-btn" onClick={() => navigate(routes.friends)}>
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
    </>
  );
};

export default UserBar;