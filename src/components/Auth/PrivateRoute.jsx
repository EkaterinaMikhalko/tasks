import { useAuth } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading-spinner">Загрузка...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;