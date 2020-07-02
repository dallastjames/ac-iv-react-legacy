import { useAuth } from './useAuth';
import AuthSingleton from '../services/Authentication';
jest.mock('../services/Authentication');

describe('useAuth', () => {
  it('should dispatch LOGIN when logging in', async () => {});
});

// describe('useAuthConnect', () => {
//   let mock: IonicAuth = jest.genMockFromModule('@ionic-enterprise/auth');
//   mock.isAuthenticated = jest.fn(() => Promise.resolve(true));
//   mock.login = jest.fn(() => Promise.resolve());
//   mock.logout = jest.fn(() => Promise.resolve());

//   it('should initialize authentication status', async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useAuthConnect(mock));
//     await waitForNextUpdate();
//     expect(result.current.isAuthenticated).toBeTruthy();
//     expect(mock.isAuthenticated).toHaveBeenCalled();
//   });

//   it('should update isAuthenticated after logging in', async () => {
//     const { result } = renderHook(() => useAuthConnect(mock));
//     await act(() => result.current.login());
//     expect(mock.login).toHaveBeenCalled();
//     expect(result.current.isAuthenticated).toBeTruthy();
//   });

//   it('should update isAuthenticated after logging out', async () => {
//     const { result } = renderHook(() => useAuthConnect(mock));
//     await act(() => result.current.logout());
//     expect(mock.logout).toHaveBeenCalled();
//     expect(result.current.isAuthenticated).toBeFalsy();
//   });

//   it('should update isAuthenticated after refreshing', async () => {
//     const { result } = renderHook(() => useAuthConnect(mock));
//     await act(() => result.current.refresh());
//     expect(mock.isAuthenticated).toHaveBeenCalled();
//     expect(result.current.isAuthenticated).toBeTruthy();
//   });

//   afterEach(cleanup);
// });
