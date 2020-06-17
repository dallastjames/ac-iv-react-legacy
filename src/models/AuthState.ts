export default interface AuthState {
  isAuthenticated: boolean;
  error: string | undefined;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  error: undefined
};
