import {
  BiometricType,
  IdentityVault,
  PluginConfiguration,
  SupportedBiometricType,
} from '@ionic-enterprise/identity-vault';

// Sets Identity Vault to use localStorage on web.
// You will most likely want to use a more secure storage option if PWA
// is a desired deployment destination.
const storage: any = window.localStorage;

const browserVaultConfig: PluginConfiguration = {
  descriptor: {
    username: '',
    vaultId: '',
  },
  isSecureStorageModeEnabled: true,
  isBiometricsEnabled: false,
  isPasscodeEnabled: false,
  isPasscodeSetupNeeded: false,
  hideScreenOnBackground: false,
  lockAfter: 50000,
};

/// TODO: better comments on this code.
class BrowserVault implements IdentityVault {
  config: PluginConfiguration = browserVaultConfig;

  isLockedOutOfBiometrics(): Promise<boolean> {
    return Promise.resolve(false);
  }

  getAvailableHardware(): Promise<SupportedBiometricType[]> {
    return Promise.resolve([]);
  }

  unsubscribe(): Promise<void> {
    return Promise.resolve();
  }

  async clear() {
    await storage.clear();
  }

  lock(): Promise<void> {
    return Promise.resolve();
  }

  isLocked(): Promise<boolean> {
    return Promise.resolve(false);
  }

  async isInUse(): Promise<boolean> {
    return !!(await storage.getItem('session'));
  }

  getConfig(): Promise<PluginConfiguration> {
    return Promise.resolve(browserVaultConfig);
  }

  remainingAttempts(): Promise<number> {
    return Promise.resolve(5);
  }

  getUsername(): Promise<string> {
    return Promise.resolve('MyUsername');
  }

  storeToken(token: any): Promise<void> {
    return Promise.resolve();
  }

  getToken(): Promise<any> {
    return Promise.resolve('MyToken');
  }

  async storeValue(key: string, value: any): Promise<void> {
    await storage.setItem(key, value);
  }

  async getValue(key: string): Promise<any> {
    return await storage.getItem(key);
  }

  removeValue(key: string): Promise<any> {
    storage.removeItem(key);
    return Promise.resolve();
  }

  async getKeys(): Promise<any> {
    return Object.keys(storage);
  }

  getBiometricType(): Promise<BiometricType> {
    const none: BiometricType = 'none';
    return Promise.resolve(none);
  }

  setBiometricsEnabled(isBiometricsEnabled: boolean): Promise<void> {
    return Promise.resolve();
  }

  isBiometricsEnabled(): Promise<boolean> {
    return Promise.resolve(false);
  }

  isBiometricsAvailable(): Promise<boolean> {
    return Promise.resolve(false);
  }

  isBiometricsSupported(): Promise<boolean> {
    return Promise.resolve(false);
  }

  isPasscodeSetupNeeded(): Promise<boolean> {
    return Promise.resolve(false);
  }

  setPasscode(passcode?: string): Promise<void> {
    return Promise.resolve();
  }

  isPasscodeEnabled(): Promise<boolean> {
    return Promise.resolve(false);
  }

  isSecureStorageModeEnabled(): Promise<boolean> {
    return Promise.resolve(true);
  }

  setPasscodeEnabled(isPasscodeEnabled: boolean): Promise<void> {
    return Promise.resolve();
  }

  setSecureStorageModeEnabled(enabled: boolean): Promise<void> {
    return Promise.resolve();
  }

  unlock(usingPasscode?: boolean, passcode?: string): Promise<void> {
    return Promise.resolve();
  }
}

export default class BrowserVaultSingleton {
  private static instance: BrowserVault | undefined = undefined;

  static getInstance(): BrowserVault {
    if (this.instance === undefined) this.instance = new BrowserVault();
    return this.instance;
  }
}
