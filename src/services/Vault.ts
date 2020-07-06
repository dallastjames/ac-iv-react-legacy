import {
  AuthMode,
  IonicIdentityVaultUser,
  IonicNativeAuthPlugin,
  BiometricType,
  VaultConfig
} from '@ionic-enterprise/identity-vault';
import { isPlatform } from '@ionic/react';
import User from '../models/User';
import BrowserPlugin from './BrowserPlugin';

export class Vault extends IonicIdentityVaultUser<User> {
  constructor() {
    super(
      { ready: () => Promise.resolve() },
      {
        androidPromptTitle: 'Auth Connect w/ Identity Vault Demo',
        androidPromptSubtitle: 'Demo All the Things!',
        androidPromptDescription: 'You need to unlock me',
        restoreSessionOnReady: false,
        unlockOnReady: false,
        unlockOnAccess: true,
        lockAfter: 5000,
        hideScreenOnBackground: true,
        allowSystemPinFallback: true,
        shouldClearVaultAfterTooManyFailedAttempts: false
      }
    );
  }

  /**
   * This determines which `IonicNativeAuthPlugin` implementation to use.
   *
   * On mobile devices, we will use the device's secure enclave. There is no
   * available equivalent for web; the consumer must provide their own implementation
   * for web/PWA. This application provides a sample implementation: `BrowserPlugin`.
   * @returns {IonicNativeAuthPlugin} The IonicNativeAuthPlugin implementation.
   */
  getPlugin(): IonicNativeAuthPlugin {
    if (isPlatform('capacitor')) return super.getPlugin();
    return BrowserPlugin;
  }

  /**
   * This returns true if the vault is locked, or false if the Vault is unlocked.
   * @returns {Promise<boolean>} The lock status of the Vault.
   */
  async isLocked(): Promise<boolean> {
    const vault = await this.getVault();
    return vault.isLocked();
  }

  /**
   * This will display the custom passcode prompt when:
   * 1. The user is requested to establish a passcode.
   * 2. The user is requested to unlock using their passcode.
   * The method completes once the Vault plugin is finished using the passcode.
   * @returns {Promise<string>} The passcode entered.
   */
  async onPasscodeRequest(isPasscodeSetRequest: boolean): Promise<string> {
    console.log('App::Vault::onPasscodeRequest');
    return '111';
  }

  onVaultLocked() {
    console.log('App: Vault::onVaultLocked');
  }

  onVaultUnlocked() {
    console.log('App: Vault::onVaultUnlocked');
  }
}

export default class VaultSingleton {
  private static instance: Vault | undefined = undefined;

  static getInstance(): Vault {
    if (this.instance === undefined) this.instance = new Vault();
    return this.instance;
  }
}
