import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './.constants';
import LogIn from './logging/LogIn'
import SignUp from './logging/SignUp'
import Game from './Game';
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
                {/* Routes for all the pages */}
                <Route path={routes.login} element={<LogIn />} />
                <Route path={routes.signup} element={<SignUp />} />
                <Route path={routes.game} element={
                    <Game /> } />

                {/* Default route in the \ */}
                <Route path={routes.home} element={<GameMenu />} />

                <Route path="/profile" element={<Profile />} />
                <Route path={routes.login} element={<LogIn />} />
                <Route path={routes.signup} element={<SignUp />} />
            </Routes>
        </Router>
    ); 
}

export default App;
