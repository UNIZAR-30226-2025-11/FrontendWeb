import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Outlet } from 'react-router-dom';
import { routes } from './utils/constants';
import Game from './pages/game/game';
import GameMenu from './pages/menu/menu'
import AuthPage from './pages/profile/welcomePage';
import { SocketProvider } from './context/SocketContext';
import { ProtectedLogin, ProtectedNotLogin } from './components/middleware/protectedRoute';
import Container from './components/logging/Container';
import { AnimatedBackground } from './common/AnimatedBackground/AnimatedBackground';
import InvitationModal from './common/InvitationModal/InvitationModal';
import { FriendsList } from './components/layout/FriendsList';
import ChangePasswordPage from './pages/profile/ChangePassword';
import UserStatistics from './pages/profile/Statistics';
import Shop from './pages/shop/shop';
import ProfileCustomization from './pages/profile/ProfileCustomization';

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
            <InvitationModal/>
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

          {/* Route for the friends list */}
          <Route path={routes.friends} element={<FriendsList />} />

          {/* Route for the change password page */}
          <Route path={routes.chgpassw} element={<ChangePasswordPage />} />

          {/* Route for statistics */}
          <Route path={routes.statistics} element={<UserStatistics />} />

          {/* Route for the avatar selection */}
          <Route path={routes.profilecustomization} element={<ProfileCustomization />} />

        </Route>
      </Routes>
    </Router>
  ); 
}

export default App;
