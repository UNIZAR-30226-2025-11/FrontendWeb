import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GameMenu from './menu/GameMenu';
import Game from './menu/Game'; 
import Profile from './menu/Profile';
import AuthPage from './menu/AuthPage';
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<GameMenu />} />
      <Route path="/game" element={<Game />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
};

export default App;
