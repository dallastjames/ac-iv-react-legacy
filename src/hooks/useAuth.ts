import { useContext } from 'react';
import { AuthContext } from '../middleware/contexts/AuthContext';
import AuthSingleton from '../services/Authentication';
import User from '../models/User';

export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  const authentication = AuthSingleton.getInstance();

  if (state === undefined) {
    throw new Error('useAuth must be used with an AuthProvider');
  }

  const login = async (): Promise<void> => {
    dispatch({ type: 'LOGIN' });

    try {
      authentication.onLoginSuccessCallback = (user: User) => {
        dispatch({ type: 'LOGIN_SUCCESS', user });
      };
      await authentication.login();
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', error });
    }
  };

  const logout = async (): Promise<void> => {
    dispatch({ type: 'LOGOUT' });
    await authentication.logout();
  };

  return {
    isAuthenticated: state.isAuthenticated,
    error: state.error,
    loading: state.loading,
    user: state.user,
    getAccessToken: authentication.getAccessToken,
    login,
    logout
  };
};
