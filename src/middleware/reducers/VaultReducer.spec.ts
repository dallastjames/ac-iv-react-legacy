import { AuthMode } from '@ionic-enterprise/identity-vault';
import VaultState, { initialState } from '../../models/VaultState';
import { reducer } from './VaultReducer';

describe('VaultReducer', () => {
  describe('Action: SET_AUTH_MODE', () => {
    it('should set authMode property', () => {
      let state: VaultState = initialState;
      state = reducer(state, {
        type: 'SET_AUTH_MODE',
        authMode: AuthMode.BiometricAndPasscode,
      });
      expect(state.authMode).toBe(AuthMode.BiometricAndPasscode);
    });
  });

  describe('Action: SET_VAULT_ERROR', () => {
    it('should set the error property', () => {
      const errorMessage = 'IdentityVault Error';
      let state: VaultState = initialState;
      state = reducer(state, {
        type: 'SET_VAULT_ERROR',
        error: new Error(errorMessage),
      });
      expect(state.error.message).toBe(errorMessage);
    });
  });
});
