import { AuthMode, SupportedBiometricType } from '@ionic-enterprise/identity-vault';

export class MockVault {
  async isLocked(): Promise<boolean> {
    return false;
  }

  async setAuthMode(authMode: AuthMode): Promise<void> {}
  async getAvailableHardware(): Promise<SupportedBiometricType[]> {
    return ['fingerprint', 'face', 'iris'];
  }
}

export default class MockVaultSingleton {
  private static instance: MockVault | undefined = undefined;

  static getInstance(): MockVault {
    if (this.instance === undefined) this.instance = new MockVault();
    return this.instance;
  }
}
