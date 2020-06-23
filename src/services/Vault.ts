import {
  AuthMode,
  IonicIdentityVaultUser,
  IonicNativeAuthPlugin,
  BiometricType,
  VaultConfig
} from '@ionic-enterprise/identity-vault';
import { User } from '../models/User';
import { isPlatform } from '@ionic/react';
import BrowserPlugin from './BrowserPlugin';

class Vault extends IonicIdentityVaultUser<User> {
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

  async isLocked(): Promise<boolean> {
    const vault = await this.getVault();
    return vault.isLocked();
  }

  onVaultLocked() {
    console.log('App: Vault::onVaultLocked');
  }

  onVaultUnlocked() {
    console.log('App: Vault::onVaultUnlocked');
  }

  ///TODO: Comment that this determines which plugin to use depending on platform.
  getPlugin(): IonicNativeAuthPlugin {
    if (isPlatform('capacitor')) return super.getPlugin();
    return BrowserPlugin;
  }
}

export default class VaultSingleton {
  private static instance: Vault | undefined = undefined;

  static getInstance(): Vault {
    if (this.instance === undefined) this.instance = new Vault();
    return this.instance;
  }
}
