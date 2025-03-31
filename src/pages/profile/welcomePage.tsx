import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login'); // Navigate to the Login page
    }

    const handleSignUp = () => {
        navigate('/signup'); // Navigate to the SignUp page
    }

    return (
        <div className="welcome-container">
            <div className="content-container">
                <h1 className="welcome-title">Exploding Kittens Game</h1>
                <div className="button-container">
                    <button className="welcome-button" onClick={handleLogin}>Log In</button>
                    <button className="welcome-button" onClick={handleSignUp}>Sign Up</button>
                </div>
            </div>
        </div>
    );
}

export default WelcomePage;
