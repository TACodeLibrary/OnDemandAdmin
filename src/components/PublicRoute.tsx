import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PublicRouteProps {
  children: ReactNode;
  restricted?: boolean;
}

const PublicRoute = ({ children, restricted = false }: PublicRouteProps) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('token'); // Replace with your auth logic
  const from = location.state?.from?.pathname || '/dashboard';

  if (isAuthenticated && restricted) {
    // Redirect to the page they came from or dashboard
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute; 