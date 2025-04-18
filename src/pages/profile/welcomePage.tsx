import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../../common/GlassCard/GlassCard';

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
    <GlassCard title="Welcome to KatBoom!" 
      maxwidth={500} 
      minwidth={50}>
      <div className="button-container">
      <button className="GC-button GC-red-btn" onClick={handleLogin}>
          <span className="GC-button-text">Log In</span>
        </button>
        <button className="GC-button GC-blue-btn" onClick={handleSignUp}>
          <span className="GC-button-text">Sign Up</span>
        </button>
      </div>
    </GlassCard>
  );
};

export default WelcomePage;