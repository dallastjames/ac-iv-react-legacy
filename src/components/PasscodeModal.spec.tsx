import React from 'react';
import { render } from '@testing-library/react';
import { ionFireEvent as fireEvent } from '@ionic/react-test-utils';
import PasscodeModal from './PasscodeModal';
jest.mock('../services/Authentication');

describe('<PasscodeModal />', () => {
  describe('initialization', () => {
    describe('user must create a passcode', () => {
      it('should set the title to "Create a Passcode"', () => {
        const { getByText } = render(<PasscodeModal isOpen={true} shouldCreatePasscode={true} />);
        expect(getByText('Create a Passcode')).toBeInTheDocument();
      });
    });

    describe('user must unlock using passcode', () => {
      it('should set the title to "Unlock with Passcode"', () => {
        const { getByText } = render(<PasscodeModal isOpen={true} shouldCreatePasscode={false} />);
        expect(getByText('Unlock with Passcode')).toBeInTheDocument();
      });
    });
  });

  describe('disable submit', () => {
    const passcodeModal = <PasscodeModal isOpen={true} shouldCreatePasscode={true} />;

    it('should be disabled if the passcode length is zero', () => {
      const { getByRole } = render(passcodeModal);
      const disabledValue = (getByRole('submit') as any).disabled;
      expect(disabledValue).toBeTruthy();
    });

    it('should be disabled if the passcode length is 1', () => {
      const { getByRole, getByText } = render(passcodeModal);
      const oneDigitButton = getByText('1');
      fireEvent.click(oneDigitButton);
      const disabledValue = (getByRole('submit') as any).disabled;
      expect(disabledValue).toBeTruthy();
    });

    it('should be disabled if the passcode length is 2', () => {
      const { getByRole, getByText } = render(passcodeModal);
      const oneDigitButton = getByText('1');
      fireEvent.click(oneDigitButton);
      fireEvent.click(oneDigitButton);
      const disabledValue = (getByRole('submit') as any).disabled;
      expect(disabledValue).toBeTruthy();
    });

    it('should be disabled if the passcode length is 3', () => {
      const { getByRole, getByText } = render(passcodeModal);
      const oneDigitButton = getByText('1');
      fireEvent.click(oneDigitButton);
      fireEvent.click(oneDigitButton);
      fireEvent.click(oneDigitButton);
      const disabledValue = (getByRole('submit') as any).disabled;
      expect(disabledValue).toBeTruthy();
    });

    it('should be disabled if the user removes a number', async () => {
      const { getByRole, getByText } = render(passcodeModal);
      const zeroDigitButton = getByText('0');
      const removeDigitButton = getByRole('remove');
      fireEvent.click(zeroDigitButton);
      fireEvent.click(zeroDigitButton);
      fireEvent.click(zeroDigitButton);
      fireEvent.click(zeroDigitButton);
      fireEvent.click(removeDigitButton);
      const disabledValue = (getByRole('submit') as any).disabled;
      expect(disabledValue).toBeTruthy();
    });

    it('should be enabled if the passcode length is 4', async () => {
      const { getByRole, getByText } = render(passcodeModal);
      const oneDigitButton = getByText('1');
      fireEvent.click(oneDigitButton);
      fireEvent.click(oneDigitButton);
      fireEvent.click(oneDigitButton);
      fireEvent.click(oneDigitButton);
      const disabledValue = (getByRole('submit') as any).disabled;
      expect(disabledValue).toBeFalsy();
    });
  });

  describe('setting passcode', () => {
    const passcodeModal = <PasscodeModal isOpen={true} shouldCreatePasscode={true} />;

    it('should prompt the user to verify their passcode', () => {
      const { getByText, getByRole } = render(passcodeModal);
      const oneDigitButton = getByText('1');
      const submitButton = getByRole('submit');

      fireEvent.click(oneDigitButton);
      fireEvent.click(oneDigitButton);
      fireEvent.click(oneDigitButton);
      fireEvent.click(oneDigitButton);

      fireEvent.click(submitButton);

      expect(getByText('Verify Passcode')).toBeInTheDocument();
    });

    it('should display an error if passcode verification fails', () => {
      const { getByText, getByRole } = render(passcodeModal);
      const oneDigitButton = getByText('1');
      const twpDigitButton = getByText('2');

      const submitButton = getByRole('submit');

      fireEvent.click(oneDigitButton);
      fireEvent.click(oneDigitButton);
      fireEvent.click(oneDigitButton);
      fireEvent.click(oneDigitButton);

      fireEvent.click(submitButton);

      fireEvent.click(oneDigitButton);
      fireEvent.click(oneDigitButton);
      fireEvent.click(oneDigitButton);
      fireEvent.click(twpDigitButton);

      fireEvent.click(submitButton);

      expect(getByText('Create a Passcode')).toBeInTheDocument();
      expect(getByText('Passcodes do not match')).toBeInTheDocument();
    });
  });
});
