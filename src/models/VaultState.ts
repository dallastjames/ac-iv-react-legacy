import { AuthMode } from '@ionic-enterprise/identity-vault';
import { PinMode } from './PinMode';

export default interface VaultState {
  authMode: AuthMode;
  hasSessionStored: boolean;
  pinMode: PinMode;
}

export const initialState: VaultState = {
  authMode: AuthMode.InMemoryOnly,
  hasSessionStored: false,
  pinMode: PinMode.Dismiss
};
