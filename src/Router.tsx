import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/login';
import FindAccount from './pages/auth/forgot-password/find-account';
import VerifyAccount from './pages/auth/forgot-password/verify-account';
import ResetPassword from './pages/auth/reset-password';
import ForgotPassword from './pages/auth/forgot-password';


const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />}>
                <Route path="find-account" element={<FindAccount />} />
                <Route path="verify-account" element={<VerifyAccount />} />
            </Route>
            <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
    );
};

export default AppRouter;
