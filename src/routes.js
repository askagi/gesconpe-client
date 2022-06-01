import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { getItem } from './utils/localStorage';

const MainRouter = () => {

    function ProtectedRoutes({ redirectTo }) {
        const token = getItem('token');
        const isAuthenticated = token;

        return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
    }

    return (
        <Routes>

            <Route path='/'>
                <Route path='/' element={<SignIn />} />
                <Route path='/sign-in' element={<SignIn />} />
            </Route>

            <Route path='/sign-up' element={<SignUp />} />

            <Route element={<ProtectedRoutes redirectTo='/' />}>
                <Route path='/home' element={<Home />} />
            </Route>


            <Route path='*' element={<div className='container flex-center'>
                <h1>404 - Not found</h1>
            </div>} />

        </Routes>
    )
}

export default MainRouter;