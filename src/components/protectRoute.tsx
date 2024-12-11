import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: JSX.Element;
}

export const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token'); 

  if (!token) {
    return <Navigate to="/signup" replace />;
  }
  return element;
};

