import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom';

import { routes } from './.constants';
import LogIn from './logging/LogIn'
import SignUp from './logging/SignUp'

function App() {
    return (
        <Router>
            <Routes>
                <Route path={routes.login} element={<LogIn />} />
                <Route path={routes.signup} element={<SignUp />} />
                <Route path={routes.home} element={<Navigate to={routes.login} />} />
            </Routes>
        </Router>
    ); 
}

export default App;