import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/constants';

import './authPage.css';
import Container from '../../components/logging/Container';
/**
 * MainPage Component
 * Displays the main page with two buttons for "Log In" and "Sign Up".
 */
const MainPage = () => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState(0);

  // Navigate to the login page
  const handleLogin = () => {
    navigate(routes.login);
  };

  // Navigate to the signup page
  const handleSignUp = () => {
    navigate(routes.signup);
  };

  const welcome = () => {
    return (
      <div className="main-page-container">
        <h1>Welcome to the Game</h1>
        <div className="button-container">
          <button onClick={() => {setSelected(1)}} className="btn">
            Log In
          </button>
          <button onClick={() => {setSelected(2)}} className="btn">
            Sign Up
          </button>
        </div>
      </div>
    )
  }

  const HTML = () => {
    if (selected == 0)
      return welcome();
    else
      return (
        <div className='App cfb'>
          <Container logIn={selected == 1}/>
        </div>
      )
  }

  return HTML();
};

export default MainPage;
