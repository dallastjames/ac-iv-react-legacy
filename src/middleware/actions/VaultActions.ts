import { AuthMode } from '@ionic-enterprise/identity-vault';

type VaultAction = { type: 'SET_AUTH_MODE'; authMode: AuthMode } | { type: 'LOCK_VAULT' } | { type: 'UNLOCK_VAULT' };
export default VaultAction;
