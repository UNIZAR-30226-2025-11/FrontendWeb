import React, { useState, useEffect } from 'react';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import './Container.css';
import GlassCard from '../../common/GlassCard/GlassCard';

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
    <div className="login-page">
      <GlassCard title= {welcome ? "Create Account" : "Welcome Back"} minwidth={400}>
        {welcome ? <SignUp /> : <SignIn />}

        <div className="GC-button-container">
          <button 
            className="GC-button signup-btn"
            onClick={() => setWelcome(!welcome)}
          >
            <span className="GC-button-text">
              {welcome ? "Already have an account? Log In" : "Need an account? Sign Up"}
            </span>
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

export default Container;