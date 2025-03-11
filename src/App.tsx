import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./utils/constants";
import LogIn from "./logging/LogIn";
import SignUp from "./logging/SignUp";
import Game from "./game/Game";
import GameMenu from "./menu/GameMenu";
import Profile from "./menu/Profile";
import Shop from "./shop/CardShop";
// import WinLose from './game/WinLose';
import AuthPage from "./menu/AuthPage";
import Layout from "./Layout/Layout";

import { socket } from "./utils/socket";

/**
 * Creates the application, prepares all the routes and loads
 * the initial page.
 *
 * @returns A Router object with the routes of the application.
 */
function App() {
  // Putting Socket.io stuff here
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected!");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    socket.on("connect_error", (err) => {
      console.log(err.message);
    });

    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

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

          {/* Routes for the user profile */}
          <Route path={routes.profile} element={<Profile />} />

          {/* Route for the shop */}
          <Route path={routes.shop} element={<Shop />} />

          {/* Route for the win/lose screen */}
          {/* <Route path={routes.winlose} element={<WinLose />} /> */}

          {/* Route for the game menu */}
          <Route path={routes.gamemenu} element={<GameMenu />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
