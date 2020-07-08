import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login';
jest.mock('../services/Authentication');

describe('<Login />', () => {
  it('prompt the user to Sign In', () => {
    const { getByText } = render(<Login />);
    const signInButtonDisabledValue = (getByText('Sign In') as any).disabled;
    expect(signInButtonDisabledValue).toBeFalsy();
  });
});
