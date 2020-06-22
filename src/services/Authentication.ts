import { isPlatform } from '@ionic/react';
import { IonicAuth, IonicAuthOptions } from '@ionic-enterprise/auth';
import { User } from '../models/User';
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

class Authentication extends IonicAuth<User> {
  onLoginSuccessCallback: (user: User) => void = () => {};
  onLogoutCallback: () => void = () => {};

  constructor() {
    super(options);
  }

  async onLoginSuccess(): Promise<void> {
    const user = this.unpackIdToken(await this.getIdToken());
    this.onLoginSuccessCallback(user);
  }

  async onLogout(): Promise<void> {
    this.onLogoutCallback();
  }

  async getCurrentUser(): Promise<User> {
    const idTokenInfo = await this.getIdToken();
    return this.unpackIdToken(idTokenInfo);
  }

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
