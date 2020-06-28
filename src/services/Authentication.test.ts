import AuthSingleton, { Authentication } from './Authentication';
import { User } from '../models/User';
jest.mock('./Authentication');

describe('Authentication', () => {
  let auth: Authentication;
  beforeAll(() => (auth = AuthSingleton.getInstance()));

  describe('onLoginSuccess', () => {
    it('should call onLoginSuccessCallback when completed', async () => {
      await auth.onLoginSuccess();
      expect(auth.onLoginSuccessCallback).toHaveBeenCalledTimes(1);
    });

    it('should return user information to onLoginSuccessCallback', async () => {
      let user: User;
      auth.onLoginSuccessCallback = (u) => (user = u);
      await auth.onLoginSuccess();
      expect(user!.id).toBe('1234');
      expect(user!.email).toBe('john.doe@company.com');
    });
  });

  describe('onLogout', () => {
    it('should call onLogoutSuccess when completed', async () => {
      await auth.onLogout();
      expect(auth.onLogoutCallback).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCurrentUser', () => {
    it('should return the current user information', async () => {
      const { id, email } = await auth.getCurrentUser();
      expect(id).toBe('1234');
      expect(email).toBe('john.doe@company.com');
    });
  });
});
