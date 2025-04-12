import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Outlet } from 'react-router-dom';
import { routes } from './utils/constants';
import Game from './pages/game/game';
import GameMenu from './pages/menu/menu'
import Shop from './components/shop/CardShop';
import AuthPage from './pages/profile/welcomePage';
import ChangePasswordPage from './pages/profile/ChangePassword';
import Statistics from './pages/profile/Statistics'
import { SocketProvider } from './context/SocketContext';
import { ProtectedLogin, ProtectedNotLogin } from './components/middleware/protectedRoute';
import Container from './components/logging/Container';
import UserBar from './components/layout/UserBar';
import { AnimatedBackground } from './common/AnimatedBackground/AnimatedBackground';
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
        <Route
          element={
            <ProtectedLogin> {/* Redirects to /gamemenu if user is logged in */}
              <AnimatedBackground showUserBar={false}>
              <Outlet />
              </AnimatedBackground>
            </ProtectedLogin>
          }
        >
          <Route path={routes.home} element={<AuthPage />} />
          <Route path={routes.login} element={<Container logIn={true}/>} />
          <Route path={routes.signup} element={<Container logIn={false}/>} />
        </Route>

        <Route path="/" element={
          <SocketProvider>
            <ProtectedNotLogin>
              <AnimatedBackground showUserBar={true}>
                <Outlet />
              </AnimatedBackground>
            </ProtectedNotLogin>
          </SocketProvider>}>
          
          {/* Route for the game screen */}
          <Route path={routes.game} element={<Game />} />

          {/* Route for the shop */}
          <Route path={routes.shop} element={<Shop />} />

          {/* Route for the game menu */}
          <Route path={routes.gamemenu} element={<GameMenu />} />

          {/* Route for the change password page */}
          <Route path={routes.chgpassw} element={<ChangePasswordPage />} />

          {/* Route for statistics */}
          <Route path={routes.statistics} element={<Statistics />} />
        </Route>
      </Routes>
    </Router>
  ); 
}

export default App;
