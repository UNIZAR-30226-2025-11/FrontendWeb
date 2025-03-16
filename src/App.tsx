import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { routes } from './utils/constants';
import LogIn from './components/logging/LogIn';
import SignUp from './components/logging/SignUp';
import Game from './pages/game/game';
import GameMenu from './pages/menu/menu'
import Shop from './components/shop/CardShop';
import AuthPage from './pages/profile/authPage';
import Layout from './components/layout/Layout';
import ChangePasswordPage from './pages/profile/ChangePassword';
import Statistics from './pages/profile/Statistics'

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

          {/* Route for the shop */}
          <Route path={routes.shop} element={<Shop />} />

          {/* Route for the game menu */}
          <Route path={routes.gamemenu} element={<GameMenu />} />

          {/* Route for the change password page */}
          <Route path={routes.chgpassw} element={<ChangePasswordPage />} />

          {/* Route for statistics */}
          <Route path={routes.statistics} element={<Statistics totalGames={60} wonGames={30} recentResults={['win', 'loss', 'win', 'win', 'loss', 'loss', 'win', 'win', 'loss', 'win']}/>} />
        </Route>
      </Routes>
    </Router>
  ); 
}

export default App;
