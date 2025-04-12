import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';
import { AnimatedBackground } from '../../common/AnimatedBackground/AnimatedBackground';
const WelcomePage = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  // This useEffect is just for the content animation
  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleLogin = () => navigate('/login');
  const handleSignUp = () => navigate('/signup');

  return (
    <AnimatedBackground>
    <div className={`content-container ${loaded ? 'visible' : ''}`}>
      <div className="logo-container">
        <h1 className="welcome-title">Exploding Kittens</h1>
      </div>
      
      <div className="button-container">
        <button className="welcome-button login-btn" onClick={handleLogin}>
          <span className="button-text">Log In</span>
        </button>
        <button className="welcome-button signup-btn" onClick={handleSignUp}>
          <span className="button-text">Sign Up</span>
        </button>
      </div>
      
      <div className="paw-print paw-print-1"></div>
      <div className="paw-print paw-print-2"></div>
      <div className="paw-print paw-print-3"></div>
    </div>
    </AnimatedBackground>

  );
};

export default WelcomePage;