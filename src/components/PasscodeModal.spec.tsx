import React from 'react';
import { render } from '@testing-library/react';
import PasscodeModal from './PasscodeModal';

describe('<PasscodeModal />', () => {
  describe('initialization', () => {
    describe('user must create a passcode', () => {
      it('should set the title to "Create a Passcode"', async () => {
        const { getByText } = render(<PasscodeModal isOpen={true} shouldCreatePasscode={true} />);
        expect(getByText('Create a Passcode')).toBeInTheDocument();
      });
    });

    describe('user must unlock using passcode', () => {
      it('should set the title to "Unlock with Passcode"', async () => {
        const { getByText } = render(<PasscodeModal isOpen={true} shouldCreatePasscode={false} />);
        expect(getByText('Unlock with Passcode')).toBeInTheDocument();
      });
    });
  });

  describe('disable submit', () => {
    test('should be disabled if the passcode length is zero', async () => {
      const { getByRole } = render(<PasscodeModal isOpen={true} shouldCreatePasscode={true} />);
      const disabledValue = (getByRole('submit') as any).disabled;
      expect(disabledValue).toBeTruthy();
    });
  });
});
