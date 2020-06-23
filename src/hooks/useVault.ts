import { useContext } from 'react';
import { VaultContext } from '../middleware/contexts/VaultContext';
import VaultSingleton from '../services/Vault';
import { AuthMode } from '@ionic-enterprise/identity-vault';
import { setStoredAuthMode } from '../services/Settings';

export const useVault = () => {
  const { state, dispatch } = useContext(VaultContext);
  const vault = VaultSingleton.getInstance();

  if (state === undefined) {
    throw new Error('useVault must be used with a VaultProvider');
  }

  const getAuthMode = async (): Promise<AuthMode> => {
    return await vault.getAuthMode();
  };

  const setAuthMode = async (authMode: AuthMode): Promise<void> => {
    try {
      await setStoredAuthMode(authMode);
      dispatch({ type: 'SET_AUTH_MODE', authMode });
    } catch (error) {
      console.error(`Unable to set the Vault to ${AuthMode[authMode]}.`);
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
    vault: state,
    getAuthMode,
    setAuthMode,
    getSupportedBiometricsTypes
  };
};
