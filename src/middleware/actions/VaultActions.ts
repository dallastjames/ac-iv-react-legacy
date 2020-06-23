import { AuthMode } from '@ionic-enterprise/identity-vault';

type VaultAction = { type: 'SET_AUTH_MODE'; mode: AuthMode };
export default VaultAction;
