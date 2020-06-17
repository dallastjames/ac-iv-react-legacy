export default interface AuthState {
  isAuthenticated: boolean;
  error: any | undefined;
  loading: boolean;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  error: undefined,
  loading: false
};
