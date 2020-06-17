import { useContext } from 'react';
import { AuthContext } from '../middleware/contexts/AuthContext';

export const useAuth = () => {
  const {
    state: { isAuthenticated, error, loading },
    dispatch
  } = useContext(AuthContext);

  const login = async (): Promise<void> => {
    dispatch({ type: 'LOGIN' });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch({ type: 'LOGIN_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', error: error });
    }
  };

  const logout = async (): Promise<void> => {
    dispatch({ type: 'LOGOUT' });
  };

  return { isAuthenticated, error, loading, login, logout };
};
