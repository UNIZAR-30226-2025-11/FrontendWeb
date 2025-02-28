import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
'react-router-dom'
import { routes } from './.constants';
import LogIn from './logging/LogIn'
import SignUp from './logging/SignUp'
import Game from './game/Game';
import GameMenu from './menu/GameMenu'
import Profile from './menu/Profile'


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
          <Route path={routes.home} element={<GameMenu />} />

          {/* Routes for log in and sign up */}
          <Route path={routes.login} element={<LogIn />} />
          <Route path={routes.signup} element={<SignUp />} />

          {/* Route for the game screen */}
          <Route path={routes.game} element={<Game />} />

          {/* Routes for the user profile */}
          <Route path={routes.profile} element={<Profile />} />
      </Routes>
    </Router>
  ); 
}


export default App;
