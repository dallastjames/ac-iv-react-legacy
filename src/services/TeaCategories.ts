import TeaCategory from '../models/TeaCategory';

export default class TeaCategories {
  static async getAll(token: string): Promise<TeaCategory[]> {
    const url = `${process.env.REACT_APP_DATA_SERVICE_URL!}/tea-categories`;
    const headers = { Authorization: 'Bearer ' + token };
    const response = await fetch(url, { headers });
    return await response.json();
  }
}
