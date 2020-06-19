import { User } from '../../models/User';

type AuthAction =
  | { type: 'LOGIN' }
  | { type: 'LOGOUT' }
  | { type: 'LOGIN_SUCCESS'; user: User }
  | { type: 'LOGIN_FAILURE'; error: any };
export default AuthAction;
