import { User } from '../../models/User';

export class MockAuthentication {
  onLoginSuccessCallback: (user: User) => void = jest.fn();
  onLogoutCallback: () => void = jest.fn();

  login(): Promise<void> {
    return this.onLoginSuccess();
  }

  logout(): Promise<void> {
    return this.onLogout();
  }

  async onLoginSuccess(): Promise<void> {
    const user: User = { id: '1234', email: 'john.doe@company.com' };
    this.onLoginSuccessCallback(user);
  }

  async onLogout(): Promise<void> {
    this.onLogoutCallback();
  }

  async getCurrentUser(): Promise<User> {
    const user: User = { id: '1234', email: 'john.doe@company.com' };
    return user;
  }
}

export default class MockAuthSingleton {
  private static instance: MockAuthentication | undefined = undefined;

  static setInstance(instance: MockAuthentication) {
    this.instance = instance;
  }

  static getInstance(): MockAuthentication {
    if (this.instance === undefined) this.instance = new MockAuthentication();
    return this.instance;
  }
}
