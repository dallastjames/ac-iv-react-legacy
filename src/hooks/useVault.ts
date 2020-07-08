import { useContext } from 'react';
import { VaultContext } from '../middleware/contexts/VaultContext';
import VaultSingleton from '../services/Vault';
import { AuthMode } from '@ionic-enterprise/identity-vault';
import Settings from '../services/Settings';
import { StorageKeys } from '../models/StorageKeys';

export const useVault = () => {
  const { state, dispatch } = useContext(VaultContext);
  const vault = VaultSingleton.getInstance();

  if (state === undefined) {
    throw new Error('useVault must be used with a VaultProvider');
  }

  const setAuthMode = async (authMode: AuthMode): Promise<void> => {
    try {
      await vault.setAuthMode(authMode);
      await Settings.set({ key: StorageKeys.AUTH_MODE, value: authMode });
      dispatch({ type: 'SET_AUTH_MODE', authMode });
    } catch (e) {
      const error = new Error(`Unable to set the Vault to ${AuthMode[authMode]}.`);
      dispatch({ type: 'SET_VAULT_ERROR', error });
    }
  };

  const getSupportedBiometricsTypes = async (): Promise<string> => {
    let result = '';
    const types = await vault.getAvailableHardware();
    types.forEach((type) => (result += `${result ? ', ' : ''}${translateBiometricType(type)}`));
    return result;
  };

  const translateBiometricType = (type: string): string => {
    switch (type) {
      case 'fingerprint':
        return 'Finger Print';
      case 'face':
        return 'Face Match';
      case 'iris':
        return 'Iris Scan';
      default:
        return 'Unknown';
    }
  };

  return {
    authMode: state.authMode,
    error: state.error,
    hasSessionStored: state.hasSessionStored,
    showPasscodeDialog: state.showPasscodeDialog,
    setAuthMode,
    getSupportedBiometricsTypes
  };
};
