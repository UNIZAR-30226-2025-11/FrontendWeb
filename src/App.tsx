import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from './utils/constants';
import LogIn from './logging/LogIn'
import SignUp from './logging/SignUp'
import Game from './game/Game';
import GameMenu from './menu/GameMenu';
import Shop from './shop/CardShop';
// import WinLose from './game/WinLose';
import AuthPage from './menu/AuthPage';
import Layout from './Overlay/Overlay';
import ChangePasswordPage from './menu/ChangePassword';
import Statistics from './menu/Statistics';

/**
 * Creates the application, prepares all the routes and loads
 * the initial page.
 * 
 * @returns A Router object with the routes of the application.
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path={routes.home} element={<AuthPage />} />
        
        {/* Routes for log in and sign up */}
        <Route path={routes.login} element={<LogIn />} />
        <Route path={routes.signup} element={<SignUp />} />

        <Route path="/" element={<Layout />}>
          {/* Route for the game screen */}
          <Route path={routes.game} element={<Game />} />

          {/* Route for the shop */}
          <Route path={routes.shop} element={<Shop />} />

          {/* Route for the win/lose screen */}
          {/* <Route path={routes.winlose} element={<WinLose />} /> */}

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
