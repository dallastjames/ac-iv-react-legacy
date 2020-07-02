import React from 'react';
import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { useAuth } from './useAuth';
import { AuthProvider } from '../middleware/contexts/AuthContext';
import { mockUser } from '../models/User';
import AuthSingleton from '../services/Authentication';
jest.mock('../services/Authentication');

const wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>;

describe('useAuth', () => {
  afterEach(cleanup);

  describe('login', () => {
    it('should set the user on successful login', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      await act(() => result.current.login());
      expect(result.current.user).toMatchObject(mockUser);
    });

    it('should set isAuthenticated to true on successful login', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      await act(() => result.current.login());
      expect(result.current.isAuthenticated).toBeTruthy();
    });

    it('should set an error on unsuccessful login', async () => {
      const errorMsg = 'Unsuccessful login';
      const { result } = renderHook(() => useAuth(), { wrapper });
      spyOn(AuthSingleton.getInstance(), 'login').and.throwError(errorMsg);
      await act(() => result.current.login());
      expect(result.current.error.message).toBe(errorMsg);
    });
  });

  describe('logout', () => {
    it('should clear out the user object', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      await act(() => result.current.login());
      await act(() => result.current.logout());
      expect(result.current.user).toBeUndefined();
    });

    it('should set to isAuthenenticated to false', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      await act(() => result.current.login());
      await act(() => result.current.logout());
      expect(result.current.isAuthenticated).toBeFalsy();
    });
  });
});
