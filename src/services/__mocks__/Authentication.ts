import User, { mockUser } from '../../models/User';

export const mockAccessToken: string = 'ac09a8a5-2adb-413e-8bfe-ec1bca11817a';

export class MockAuthentication {
  onLoginSuccessCallback: (user: User) => void = jest.fn();
  onLogoutCallback: () => void = jest.fn();

  login(): Promise<void> {
    return this.onLoginSuccess();
  }

  logout(): Promise<void> {
    return this.onLogout();
  }

  async isAuthenticated(): Promise<boolean> {
    return true;
  }

  async onLoginSuccess(): Promise<void> {
    this.onLoginSuccessCallback(mockUser);
  }

  async onLogout(): Promise<void> {
    this.onLogoutCallback();
  }

  async getCurrentUser(): Promise<User> {
    return mockUser;
  }

  async getAccessToken(): Promise<string> {
    return mockAccessToken;
  }
}

export default class MockAuthSingleton {
  private static instance: MockAuthentication | undefined = undefined;

  static getInstance(): MockAuthentication {
    if (this.instance === undefined) this.instance = new MockAuthentication();
    return this.instance;
  }
}
