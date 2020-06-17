import AuthState, { initialState } from '../../models/AuthState';
import AuthAction from '../actions/AuthActions';

export const reducer = (state: AuthState = initialState, action: AuthAction) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, loading: true };
    case 'LOGIN_SUCCESS':
      return { ...state, isAuthenticated: true, loading: false };
    case 'LOGIN_FAILURE':
      return { ...state, error: action.error, loading: false };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};
