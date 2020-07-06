import React from 'react';
import { AuthMode } from '@ionic-enterprise/identity-vault';
import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { useVault } from './useVault';
import Settings from '../services/Settings';
import { StorageKeys } from '../models/StorageKeys';
import { VaultProvider } from '../middleware/contexts/VaultContext';
import VaultSingleton from '../services/Vault';
jest.mock('../services/Vault');

const wrapper = ({ children }: any) => <VaultProvider>{children}</VaultProvider>;

describe('useVault', () => {
  afterEach(cleanup);
  afterEach(jest.restoreAllMocks);

  describe('setAuthMode', () => {
    it("should set the Vault's AuthMode", async () => {
      const { result } = renderHook(() => useVault(), { wrapper });
      const spy = jest.spyOn(VaultSingleton.getInstance(), 'setAuthMode');
      await act(() => result.current.setAuthMode(AuthMode.BiometricAndPasscode));
      expect(spy).toHaveBeenCalledWith(AuthMode.BiometricAndPasscode);
    });

    it('should store the AuthMode in Settings', async () => {
      const { result } = renderHook(() => useVault(), { wrapper });
      const spy = jest.spyOn(Settings, 'set').mockResolvedValue();
      await act(() => result.current.setAuthMode(AuthMode.PasscodeOnly));
      expect(spy).toHaveBeenCalledWith({ key: StorageKeys.AUTH_MODE, value: AuthMode.PasscodeOnly });
    });

    it('should update the authMode property', async () => {
      const { result } = renderHook(() => useVault(), { wrapper });
      await act(() => result.current.setAuthMode(AuthMode.SecureStorage));
      expect(result.current.authMode).toBe(AuthMode.SecureStorage);
    });

    it('should set an error if unable to set AuthMode', async () => {
      const errorMsg = `Unable to set the Vault to SecureStorage.`;
      const { result } = renderHook(() => useVault(), { wrapper });
      jest.spyOn(VaultSingleton.getInstance(), 'setAuthMode').mockRejectedValueOnce(new Error(errorMsg));
      await act(() => result.current.setAuthMode(AuthMode.SecureStorage));
      expect(result.current.error.message).toBe(errorMsg);
    });
  });
});
