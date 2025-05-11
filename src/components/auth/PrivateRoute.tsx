import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
