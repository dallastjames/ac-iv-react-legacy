import { User } from './User';

export default interface AuthState {
  isAuthenticated: boolean;
  error: any | undefined;
  loading: boolean;
  user: User | undefined;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  error: undefined,
  loading: false,
  user: undefined
};
