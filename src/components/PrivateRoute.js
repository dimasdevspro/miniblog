// src/components/PrivateRoute.js

import { Navigate } from 'react-router-dom';
import { useAuthValue } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuthValue();

  if (user === undefined) {
    return <p>Carregando...</p>; // ou um spinner de carregamento
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
