import { isPlatform } from '@ionic/react';
import { IonicAuth, IonicAuthOptions } from '@ionic-enterprise/auth';
import User from '../models/User';
import VaultSingleton from './Vault';

const options: IonicAuthOptions = {
  authConfig: 'azure',
  clientID: process.env.REACT_APP_AUTH_CLIENT_ID!,
  discoveryUrl: process.env.REACT_APP_AUTH_DISCOVERY_URL!,
  scope: process.env.REACT_APP_AUTH_SCOPE!,
  audience: process.env.REACT_APP_AUTH_AUDIENCE!,
  redirectUri: isPlatform('capacitor')
    ? process.env.REACT_APP_AUTH_CAP_REDIRECT_URI!
    : process.env.REACT_APP_AUTH_WEB_REDIRECT_URI!,
  logoutUrl: isPlatform('capacitor')
    ? process.env.REACT_APP_AUTH_CAP_LOGOUT_URL!
    : process.env.REACT_APP_AUTH_WEB_LOGOUT_URL!,
  platform: isPlatform('capacitor') ? 'capacitor' : 'web',
  iosWebView: 'private',
  logLevel: 'DEBUG',
  // Sets the color of the toolbar at the top of the login webview for Android.
  // Red is used to call attention to the functionality, you will most likely want to use another color.
  androidToolbarColor: 'Red',
  // Sets Identity Vault as the storage provider for our Authentication tokens.
  tokenStorageProvider: VaultSingleton.getInstance()
};

export class Authentication extends IonicAuth<User> {
  /**
   * This property should be set before you call `login`.
   *
   * This will ensure that you have a callback that can be run after login is successful.
   */
  onLoginSuccessCallback: (user: User) => void = () => {};

  /**
   * This property should be set before you call `logout`.
   *
   * This will ensure that you have a callback that can be run after logging out.
   */
  onLogoutCallback: () => void = () => {};

  constructor() {
    super(options);
  }

  /**
   * This is called when login is successful.
   *
   * It will take the Id token exchanged from our login, extract user information
   * from it, pass it into `onLoginSuccessCallback`, and trigger `onLoginSuccessCallback`.
   */
  async onLoginSuccess(): Promise<void> {
    const user = this.unpackIdToken(await this.getIdToken());
    this.onLoginSuccessCallback(user);
  }

  /**
   * This is called when logging out.
   *
   * It will trigger `onLogoutCallback`.
   */
  async onLogout(): Promise<void> {
    this.onLogoutCallback();
  }

  /**
   * This will return the current user's information.
   * @returns {Promise<User>} The current logged in user.
   */
  async getCurrentUser(): Promise<User> {
    const idTokenInfo = await this.getIdToken();
    return this.unpackIdToken(idTokenInfo);
  }

  /**
   * This unpacks an Id token into a `User` object.
   * @param token The Id token exchanged on successful login.
   * @returns {User} The current logged in user information.
   */
  private unpackIdToken(token: any): User {
    return {
      id: token['sub'],
      firstName: token['given_name'] || '',
      lastName: token['family_name'] || '',
      email: token['emails'][0]
    };
  }
}

export default class AuthSingleton {
  private static instance: Authentication | undefined = undefined;

  static getInstance(): Authentication {
    if (this.instance === undefined) this.instance = new Authentication();
    return this.instance;
  }
}
