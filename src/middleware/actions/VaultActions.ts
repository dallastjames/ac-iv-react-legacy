import { AuthMode } from '@ionic-enterprise/identity-vault';

type VaultAction =
  | { type: 'SET_AUTH_MODE'; authMode: AuthMode }
  | { type: 'LOCK_VAULT' }
  | { type: 'UNLOCK_VAULT' }
  | { type: 'SET_VAULT_ERROR'; error: any };
export default VaultAction;
