import { AuthMode, BiometricType } from '@ionic-enterprise/identity-vault';
import { PinMode } from './PinMode';

export default interface VaultState {
  authMode: AuthMode;
  hasSessionStored: boolean;
  pinMode: PinMode;
  useBiometrics: boolean;
  usePasscode: boolean;
  useSecureStorageMode: boolean;
}

export const initialState: VaultState = {
  authMode: AuthMode.InMemoryOnly,
  hasSessionStored: false,
  pinMode: PinMode.Dismiss,
  useBiometrics: false,
  usePasscode: false,
  useSecureStorageMode: false
};
