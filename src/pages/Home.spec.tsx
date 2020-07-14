import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { ionFireEvent as fireEvent } from '@ionic/react-test-utils';
import Home from './Home';
import AuthSingleton from '../services/Authentication';
import TeaCategories from '../services/TeaCategories';
jest.mock('../services/Authentication');
jest.mock('../services/TeaCategories');

describe('<Home />', () => {
  describe('logout', () => {
    it('should log the user out', async () => {
      const { getByRole, container } = render(<Home />);
      const logoutButton = await waitForElement(() => getByRole('logout'), { container });
      jest.spyOn(AuthSingleton.getInstance(), 'logout').mockImplementationOnce(() => Promise.resolve());
      fireEvent.click(logoutButton);
      expect(AuthSingleton.getInstance().logout).toHaveBeenCalledTimes(1);
    });
  });

  describe('list data', () => {
    it('should show a skeleton list while the data is loading', async () => {
      const { getByTestId, container } = render(<Home />);
      const skeletonList = await waitForElement(() => getByTestId('loading-list'), { container });
      expect(skeletonList).toContainHTML('<ion-skeleton-text>');
    });

    it('should display a list of tea categories when loaded', async () => {
      const { getByText, container } = render(<Home />);
      const list = await waitForElement(() => getByText('Herbal'), { container });
      expect(list).toHaveTextContent('Herbal');
    });
  });

  describe('error', () => {
    const errorMsg = 'Unable to fetch teas.';
    beforeEach(() => jest.spyOn(TeaCategories, 'getAll').mockRejectedValueOnce(new Error(errorMsg)));

    it('should display a toast if an error occurs', async () => {
      const { getByText, container } = render(<Home />);
      const toast = await waitForElement(() => getByText(errorMsg), { container });
      expect(toast).toBeDefined();
    });

    ///TODO: Implement test where IonToast is dismissed.
  });
});
