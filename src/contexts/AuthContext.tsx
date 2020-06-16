import React, { createContext, useReducer, Dispatch, useMemo } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  error: string | undefined;
}

const initialState: AuthState = {
  isAuthenticated: false,
  error: undefined
};

export type AuthAction = { type: 'LOGIN' } | { type: 'LOGOUT' };

let reducer = (state: AuthState = initialState, action: AuthAction) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('AuthActions.Login');
      return { ...state, isAuthenticated: true };
    default:
      return state;
  }
};

export const AuthContext = createContext<{
  state: typeof initialState;
  dispatch: (action: AuthAction) => void;
}>({
  state: initialState,
  dispatch: () => {}
});
export const AuthConsumer = AuthContext.Consumer;

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  //const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};
