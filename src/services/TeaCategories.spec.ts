import { mockAccessToken } from './__mocks__/Authentication';
import { mockTeaCategories } from './__mocks__/TeaCategories';
import TeaCategories from './TeaCategories';
jest.mock('./TeaCategories');

describe('TeaCategories', () => {
  describe('getAll', () => {
    it('should return tea categories from the data service', async () => {
      const res = await TeaCategories.getAll(mockAccessToken);
      expect(res).toStrictEqual(mockTeaCategories);
    });
  });
});
