import VaultSingleton, { Vault } from './Vault';
jest.mock('./Vault');

describe('Vault', () => {
  let vault: Vault;
  beforeAll(() => (vault = VaultSingleton.getInstance()));

  describe('isLocked', () => {
    it('returns the value from the vault', async () => {
      expect(await vault.isLocked()).toBeFalsy();
      spyOn(vault, 'isLocked').and.returnValue(Promise.resolve(true));
      expect(await vault.isLocked()).toBeTruthy();
    });
  });
});
