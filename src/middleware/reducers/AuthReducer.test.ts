import AuthState, { initialState } from '../../models/AuthState';
import AuthAction from '../actions/AuthActions';
import { reducer } from './AuthReducer';
import { mockUser } from '../../models/User';

describe('AuthReducer', () => {
  describe('Action: LOGIN', () => {
    it('should set loading property to true', () => {
      const state = reducer(initialState, { type: 'LOGIN' });
      expect(state.loading).toBeTruthy();
    });
  });

  describe('Action: LOGIN_SUCCESS', () => {
    let state: AuthState = initialState;
    beforeAll(() => (state = reducer(initialState, { type: 'LOGIN_SUCCESS', user: mockUser })));

    it('should set the isAuthenticated property to true', () => {
      expect(state.isAuthenticated).toBeTruthy();
    });

    it('should set the loading property to false,', () => {
      expect(state.loading).toBeFalsy();
    });

    it('should set the user property', () => {
      expect(state.user.id).toBe(mockUser.id);
    });
  });

  describe('Action: LOGIN_FAILURE', () => {
    let state: AuthState = initialState;
    beforeAll(() => (state = reducer(initialState, { type: 'LOGIN_FAILURE', error: 'ERROR' })));

    it('should set the loading property to false', () => {
      expect(state.loading).toBeFalsy();
    });

    it('should set the error property to the error message', () => {
      expect(state.error).toBe('ERROR');
    });
  });

  describe('Action: LOGOUT', () => {
    it('should reset all properties back to initialState', () => {
      let state: AuthState = reducer(initialState, { type: 'LOGIN_SUCCESS', user: mockUser });
      state = reducer(state, { type: 'LOGOUT' });
      expect(state).toMatchObject(initialState);
    });
  });
});
