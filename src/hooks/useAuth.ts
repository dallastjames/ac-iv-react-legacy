import { useContext, useEffect } from 'react';
import { AuthContext } from '../middleware/contexts/AuthContext';
import AuthSingleton from '../services/Authentication';

export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  const authentication = AuthSingleton.getInstance();

  if (state === undefined) {
    throw new Error('useAuth must be used with an AuthProvider');
  }

  const checkAuthentication = async () => {
    const isUserAuthenticated = await authentication.isAuthenticated();
    if (isUserAuthenticated) {
      ///DEBUG
      await new Promise((res) => setTimeout(res, 1000));
      ///DEBUG
      dispatch({ type: 'LOGIN_SUCCESS' });
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const login = async (): Promise<void> => {
    dispatch({ type: 'LOGIN' });

    try {
      await authentication.login();
      dispatch({ type: 'LOGIN_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', error });
    }
  };

  const logout = async (): Promise<void> => {
    authentication.onLogoutCallback = () => {
      console.log('App: Logged out Callback');
      dispatch({ type: 'LOGOUT' });
    };
    await authentication.logout();
  };

  return {
    isAuthenticated: state.isAuthenticated,
    error: state.error,
    loading: state.loading,
    login,
    logout
  };
};
