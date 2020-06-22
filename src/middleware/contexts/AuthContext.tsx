import React, { createContext, useReducer, useMemo, useEffect } from 'react';
import { initialState } from '../../models/AuthState';
import AuthAction from '../actions/AuthActions';
import { reducer } from '../reducers/AuthReducer';
import AuthSingleton from '../../services/Authentication';

export const AuthContext = createContext<{
  state: typeof initialState;
  dispatch: (action: AuthAction) => void;
}>({
  state: initialState,
  dispatch: () => {}
});

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  const authentication = AuthSingleton.getInstance();

  const checkAuthenticationStatus = async () => {
    const isAuthenticated = await authentication.isAuthenticated();
    if (isAuthenticated) {
      const user = await authentication.getCurrentUser();
      dispatch({ type: 'LOGIN_SUCCESS', user: user });
    }
  };

  useEffect(() => {
    checkAuthenticationStatus();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
