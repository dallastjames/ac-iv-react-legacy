import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { ionFireEvent as fireEvent } from '@ionic/react-test-utils';
import About from './About';
import AuthSingleton from '../services/Authentication';
import VaultSingleton from '../services/Vault';
import { mockUser } from '../models/User';
jest.mock('../services/Authentication');
jest.mock('../services/Vault');

describe('<About />', () => {
  describe('logout', () => {
    it('should log the user out', async () => {
      jest.spyOn(AuthSingleton.getInstance(), 'logout').mockImplementationOnce(() => Promise.resolve());
      const { getByRole, container } = render(<About />);
      const logoutButton = await waitForElement(() => getByRole('logout'), { container });
      fireEvent.click(logoutButton);
      expect(AuthSingleton.getInstance().logout).toHaveBeenCalledTimes(1);
    });
  });

  describe('system panel', () => {
    it('should print out the Identity Vault authentication mode', async () => {
      const expectedAuthMode = 'InMemoryOnly';
      const { getByTestId, container } = render(<About />);
      const authModeLabel = await waitForElement(() => getByTestId('authMode'), { container });
      expect(authModeLabel).toHaveTextContent(expectedAuthMode);
    });

    it('should print out the supported Biometric Types', async () => {
      const expectedBiometricTypes = 'Finger Print, Face Match, Iris Scan';
      const { getByTestId, container } = render(<About />);
      const biometricTypesLabel = await waitForElement(() => getByTestId('biometricType'), { container });
      expect(biometricTypesLabel).toHaveTextContent(expectedBiometricTypes);
    });
  });
});
