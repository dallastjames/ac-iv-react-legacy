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

export class VaultService extends IonicIdentityVaultUser<User> {
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

  async setDesiredAuthMode(useBio: boolean, usePasscode: boolean, useSecureStorageMode: boolean): Promise<void> {
    const mode =
      useBio && usePasscode
        ? AuthMode.BiometricAndPasscode
        : useBio
        ? AuthMode.BiometricOnly
        : usePasscode
        ? AuthMode.PasscodeOnly
        : useSecureStorageMode
        ? AuthMode.SecureStorage
        : AuthMode.InMemoryOnly;
    return this.setAuthMode(mode);
  }

  ///TODO: Comment that this determines which plugin to use depending on platform.
  getPlugin(): IonicNativeAuthPlugin {
    if (isPlatform('capacitor')) return super.getPlugin();
    return BrowserPlugin;
  }
}
