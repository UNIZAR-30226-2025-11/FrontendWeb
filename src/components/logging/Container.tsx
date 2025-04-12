import React, { useState, useEffect } from 'react';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import './Container.css';
import { AnimatedBackground } from '../../common/AnimatedBackground/AnimatedBackground';

const Container = ({ logIn }: { logIn: boolean }) => {
  const [welcome, setWelcome] = useState(!logIn);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Add visible class after component mounts for animation
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatedBackground>
      <div className={`content-container ${visible ? 'visible' : ''}`}>
        <div className="logo-container">
          <h1 className="welcome-title">
            {welcome ? "Create Account" : "Welcome Back"}
          </h1>
          <div className="paw-print paw-print-1"></div>
          <div className="paw-print paw-print-2"></div>
          <div className="paw-print paw-print-3"></div>
          <div className="paw-print paw-print-4"></div>
        </div>

        {welcome ? <SignUp /> : <SignIn />}

        <div className="button-container">
          <button 
            className="welcome-button signup-btn"
            onClick={() => setWelcome(!welcome)}
          >
            <span className="button-text">
              {welcome ? "Already have an account? Log In" : "Need an account? Sign Up"}
            </span>
          </button>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default Container;