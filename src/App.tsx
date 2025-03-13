import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from './utils/constants';
import LogIn from './components/logging/LogIn';
import SignUp from './components/logging/SignUp';
import Game from './pages/game/game';
import GameMenu from './pages/menu/menu'
import Profile from './pages/profile/profile'
import Shop from './components/shop/CardShop';
import WinLose from './pages/winLose/winLose';
import AuthPage from './pages/profile/authPage';
import Layout from './components/layout/Layout';

/**
 * Creates the application, prepares all the routes and loads
 * the initial page.
 * 
 * @returns A Router object with the routes of the application.
 */
function App() {
  const [username, setUsername] = useState("")

  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path={routes.home} element={<AuthPage />} />
        
        {/* Routes for log in and sign up */}
        <Route path={routes.login} element={<LogIn setUsername={setUsername}/>} />
        <Route path={routes.signup} element={<SignUp setUsername={setUsername}/>} />

        <Route path="/" element={<Layout username={username}/>}>
          {/* Route for the game screen */}
          <Route path={routes.game} element={<Game />} />

          {/* Routes for the user profile */}
          <Route path={routes.profile} element={<Profile />} />

          {/* Route for the shop */}
          <Route path={routes.shop} element={<Shop />} />

          {/* Route for the win/lose screen */}
          <Route path={routes.winlose} element={<WinLose win={true} onRestart={() => {console.log("Restart")}}/>} />

          {/* Route for the game menu */}
          <Route path={routes.gamemenu} element={<GameMenu />} />
        </Route>
      </Routes>
    </Router>
  ); 
}

export default App;
