import { FactApi } from '../../../../main/utils/FactApi';

describe('FactApi', () => {
  test('Should return results from get request', async () => {
    const results = {
      data: [{
        name: 'London',
        slug: 'London',
        address: 'Address Street',
        'townName': 'AAA',
        postcode: 'AAA AAA',
      }],
    };

    const mockAxios = { get: async () => results } as any;
    const mockLogger = {} as any;

    const api = new FactApi(mockAxios, mockLogger);

    await expect(api.search('London')).resolves.toEqual(results.data);
  });

  test('Should return no result and log error from get request', async () => {

    const mockAxios = { get: async () => {
      throw new Error('Error');
    }} as any;
    const mockLogger = {
      error: async ( message: string ) => console.log(message)
    } as any;

    const spy = jest.spyOn(mockLogger, 'error');
    const api = new FactApi(mockAxios, mockLogger);

    await expect(api.search( null )).resolves.toEqual([]);
    await expect(spy).toBeCalled();

  });

  test('Should return court details result', async () => {
    const results = {
      data: [{
        name: 'London',
        slug: 'London',
        address: 'Address Street',
        'townName': 'AAA',
        postcode: 'AAA AAA',
      }],
    };

    const mockAxios = { get: async () => results } as any;
    const mockLogger = {} as any;

    const api = new FactApi(mockAxios, mockLogger);

    await expect(api.court('London')).resolves.toEqual(results.data);
  });

  test('Should return no result and log error from get request', async () => {

    const mockAxios = { get: async () => {
      throw new Error('Error');
    }} as any;
    const mockLogger = {
      error: async ( message: string ) => console.log(message)
    } as any;

    const spy = jest.spyOn(mockLogger, 'error');
    const api = new FactApi(mockAxios, mockLogger);

    await expect(api.court( null )).resolves.toEqual([]);
    await expect(spy).toBeCalled();

  });
});
