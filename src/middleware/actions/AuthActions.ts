type AuthAction =
  | { type: 'LOGIN' }
  | { type: 'LOGOUT' }
  | { type: 'LOGIN_SUCCESS' }
  | { type: 'LOGIN_FAILURE'; error: any };
export default AuthAction;
