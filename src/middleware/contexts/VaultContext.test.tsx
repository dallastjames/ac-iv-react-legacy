import React, { useContext } from 'react';
import { AuthMode } from '@ionic-enterprise/identity-vault';
import { render, waitForElement, cleanup } from '@testing-library/react';
import { VaultProvider, VaultContext } from './VaultContext';
import Settings from '../../services/Settings';
import VaultSingleton from '../../services/Vault';
jest.mock('../../services/Vault');

const MockVaultConsumer: React.FC = () => {
  const { state } = useContext(VaultContext);

  return (
    <div>
      <div data-testid="authMode">{state.authMode}</div>
    </div>
  );
};

const tree = (
  <VaultProvider>
    <MockVaultConsumer />
  </VaultProvider>
);

describe('<VaultProvider />', () => {
  afterEach(cleanup);
  afterEach(jest.restoreAllMocks);

  describe('on mount', () => {
    it('should retrieve the stored AuthMode and update state with the value', async () => {
      jest.spyOn(Settings, 'get').mockResolvedValueOnce(AuthMode.BiometricAndPasscode);
      const { getByTestId, container } = render(tree);
      const authModeElement = await waitForElement(() => getByTestId('authMode'), { container });

      expect(authModeElement.textContent).toBe(AuthMode.BiometricAndPasscode.toString());
    });

    it('should update state with AuthMode.InMemoryOnly mode if no value has been stored', async () => {
      const { getByTestId, container } = render(tree);
      const authModeElement = await waitForElement(() => getByTestId('authMode'), { container });
      expect(authModeElement.textContent).toBe(AuthMode.InMemoryOnly.toString());
    });
  });
});
