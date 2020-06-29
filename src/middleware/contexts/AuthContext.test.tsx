import React, { useContext } from 'react';
import { render, waitForElement } from '@testing-library/react';
import { AuthProvider, AuthContext } from './AuthContext';
import { mockUser } from '../../models/User';
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

describe('<AuthProvider />', () => {
  let tree: any;

  beforeEach(() => {
    tree = (
      <AuthProvider>
        <MockAuthConsumer />
      </AuthProvider>
    );
  });

  it('should dispatch LOGIN_SUCCESS on mount', async () => {
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
});
