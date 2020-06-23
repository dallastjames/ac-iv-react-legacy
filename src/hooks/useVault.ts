import { useContext } from 'react';
import { VaultContext } from '../middleware/contexts/VaultContext';
import VaultSingleton from '../services/Vault';
import { AuthMode } from '@ionic-enterprise/identity-vault';

export const useVault = () => {
  const { state, dispatch } = useContext(VaultContext);
  const vault = VaultSingleton.getInstance();

  if (state === undefined) {
    throw new Error('useVault must be used with a VaultProvider');
  }

  const getAuthMode = async (): Promise<string> => {
    return AuthMode[await vault.getAuthMode()];
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
    getSupportedBiometricsTypes
  };
};
