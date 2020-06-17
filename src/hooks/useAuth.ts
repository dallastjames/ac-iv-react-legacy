import { useContext } from 'react';
import { AuthContext } from '../middleware/contexts/AuthContext';

export const useAuth = () => {
  const {
    state: { isAuthenticated, error },
    dispatch
  } = useContext(AuthContext);

  const login = async (): Promise<void> => {
    dispatch({ type: 'LOGIN' });
  };

  const logout = async (): Promise<void> => {
    dispatch({ type: 'LOGOUT' });
  };

  return { isAuthenticated, error, login, logout };
};
