import React, { useContext } from 'react';
import { render, waitForElement, cleanup } from '@testing-library/react';
import { AuthProvider, AuthContext } from './AuthContext';
import { mockUser } from '../../models/User';
import AuthSingleton from '../../services/Authentication';
jest.mock('../../services/Authentication');

const MockAuthConsumer: React.FC = () => {
  const { state } = useContext(AuthContext);

  return (
    <div>
      {state.user && <div data-testid="id">{state.user.id}</div>}
      {state.user && <div data-testid="firstName">{state.user.firstName}</div>}
      {state.user && <div data-testid="lastName">{state.user.lastName}</div>}
      {state.user && <div data-testid="email">{state.user.email}</div>}
    </div>
  );
};

const tree = (
  <AuthProvider>
    <MockAuthConsumer />
  </AuthProvider>
);

describe('<AuthProvider />', () => {
  afterEach(cleanup);
  afterEach(jest.restoreAllMocks);

  describe('on mount', () => {
    it('should check if the current user is authenticated', async () => {
      const spy = jest.spyOn(AuthSingleton.getInstance(), 'isAuthenticated').mockResolvedValueOnce(true);
      const { getByTestId, container } = render(tree);
      await waitForElement(() => getByTestId('id'), { container });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("should update state with the current user's info if authenticated", async () => {
      const { getByTestId, container } = render(tree);
      const [idElement, firstNameElement, lastNameElement, emailElement] = await waitForElement(
        () => [getByTestId('id'), getByTestId('firstName'), getByTestId('lastName'), getByTestId('email')],
        { container }
      );
      expect(idElement.textContent).toBe(mockUser.id);
      expect(firstNameElement.textContent).toBe(mockUser.firstName);
      expect(lastNameElement.textContent).toBe(mockUser.lastName);
      expect(emailElement.textContent).toBe(mockUser.email);
    });

    it('should do nothing if the current user is unauthenticated', async () => {
      const spy = jest.spyOn(AuthSingleton.getInstance(), 'isAuthenticated').mockResolvedValueOnce(false);
      const { getByTestId, container } = render(tree);
      try {
        await waitForElement(() => getByTestId('id'), { container, timeout: 100 });
        expect(false).toBeTruthy();
      } catch (error) {
        expect(spy).toHaveBeenCalledTimes(1);
      }
    });
  });
});
