export class MockVault {
  async isLocked(): Promise<boolean> {
    return false;
  }
}

export default class MockVaultSingleton {
  private static instance: MockVault | undefined = undefined;

  static getInstance(): MockVault {
    if (this.instance === undefined) this.instance = new MockVault();
    return this.instance;
  }
}
