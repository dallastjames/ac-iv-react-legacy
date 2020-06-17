import AuthState, { initialState } from '../../models/AuthState';
import AuthAction from '../actions/AuthActions';

export const reducer = (state: AuthState = initialState, action: AuthAction) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};
