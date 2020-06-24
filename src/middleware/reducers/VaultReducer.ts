import { AuthMode } from '@ionic-enterprise/identity-vault';
import VaultState, { initialState } from '../../models/VaultState';
import VaultAction from '../actions/VaultActions';

export const reducer = (state: VaultState = initialState, action: VaultAction) => {
  switch (action.type) {
    case 'SET_AUTH_MODE':
      console.log('App::VaultReducer::SET_AUTH_MODE', AuthMode[action.authMode]);
      return { ...state, authMode: action.authMode };
    default:
      return state;
  }
};
