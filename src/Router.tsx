import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/login';
import FindAccount from './pages/auth/forgot-password/find-account';
import VerifyAccount from './pages/auth/forgot-password/verify-account';
import ResetPassword from './pages/auth/reset-password';
import ForgotPassword from './pages/auth/forgot-password';
import MainDashboard from './pages/dashboard/mainDashboard';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import LandingDashboard from './pages/dashboard/landingDashboard';


const AppRouter = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />
            <Route
                path="/forgot-password"
                element={
                    <PublicRoute>
                        <ForgotPassword />
                    </PublicRoute>
                }
            >
                <Route path="find-account" element={<FindAccount />} />
                <Route path="verify-account" element={<VerifyAccount />} />
            </Route>
            <Route
                path="/reset-password"
                element={
                    <PublicRoute>
                        <ResetPassword />
                    </PublicRoute>
                }
            />
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <MainDashboard />
                    </PrivateRoute>
                }
            />
            <Route
                path="/landing"
                element={
                    <PrivateRoute>
                        <LandingDashboard />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
};

export default AppRouter;
