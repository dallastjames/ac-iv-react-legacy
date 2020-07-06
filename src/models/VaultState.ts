import { AuthMode } from '@ionic-enterprise/identity-vault';
import { PinMode } from './PinMode';

export default interface VaultState {
  authMode: AuthMode;
  error: any | undefined;
  hasSessionStored: boolean;
  pinMode: PinMode;
}

export const initialState: VaultState = {
  authMode: AuthMode.InMemoryOnly,
  error: undefined,
  hasSessionStored: false,
  pinMode: PinMode.Dismiss
};
