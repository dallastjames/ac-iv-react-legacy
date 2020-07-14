import VaultState, { initialState } from '../../models/VaultState';
import VaultAction from '../actions/VaultActions';

export const reducer = (
  state: VaultState = initialState,
  action: VaultAction,
) => {
  switch (action.type) {
    case 'SET_AUTH_MODE':
      return { ...state, authMode: action.authMode, error: undefined };
    case 'SET_VAULT_ERROR':
      return { ...state, error: action.error };
    default:
      return state;
  }
};
