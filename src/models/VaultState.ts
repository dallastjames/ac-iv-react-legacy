import { AuthMode, BiometricType } from '@ionic-enterprise/identity-vault';
import { PinMode } from './PinMode';

export default interface VaultState {
  authMode: AuthMode;
  biometricType: BiometricType | undefined;
  biometricsEnabled: boolean;
  secureStorageEnabled: boolean;
  passcodeEnabled: boolean;
  hasSessionStored: boolean;
  pinMode: PinMode;
}

export const initialState: VaultState = {
  authMode: AuthMode.InMemoryOnly,
  biometricType: undefined,
  biometricsEnabled: false,
  secureStorageEnabled: false,
  passcodeEnabled: false,
  hasSessionStored: false,
  pinMode: PinMode.Dismiss
};
