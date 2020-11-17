import { ServicePostcodeSearchController } from '../../../../../main/controllers/service/ServicePostcodeSearchController';
import { mockRequest } from '../../../utils/mockRequest';
import { mockResponse } from '../../../utils/mockResponse';
import { PageData } from '../../../../../main/interfaces/PageData';

const i18n = {
  'postcode-search': {
    hint: '',
    errorType: ''
  }
};

describe('Service Postcode Search Controller', () => {
  const controller = new ServicePostcodeSearchController();

  test('Should render the postcode search page', async () => {
    const req = mockRequest(i18n);
    req.query = {
      error: ''
    };
    req.params = {
      service: 'money',
      serviceArea: 'tax'
    };
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData: PageData = {
      ...i18n['postcode-search'],
      path: '/search-by-postcode',
      actionUrl: '/services/money/tax/courts/near',
      error: false,
      hasNoResults: false,
      postcode: undefined
    };
    expect(res.render).toBeCalledWith('postcode-search', expectedData);
  });

  test('Should render the postcode search page with blank postcode error', async () => {
    const req = mockRequest(i18n);
    req.query = {
      error: 'blankPostcode',
    };
    req.params = {
      service: 'money',
      serviceArea: 'tax'
    };
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData: PageData = {
      ...i18n['postcode-search'],
      path: '/search-by-postcode',
      actionUrl: '/services/money/tax/courts/near',
      error: true,
      errorType: 'blankPostcode',
      hasNoResults: false,
      postcode: undefined
    };
    expect(res.render).toBeCalledWith('postcode-search', expectedData);
  });

  test('Should render the postcode search page with invalid postcode error', async () => {
    const req = mockRequest(i18n);
    req.query = {
      error: 'invalidPostcode'
    };
    req.params = {
      service: 'money',
      serviceArea: 'tax'
    };
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData: PageData = {
      ...i18n['postcode-search'],
      path: '/search-by-postcode',
      actionUrl: '/services/money/tax/courts/near',
      error: true,
      errorType: 'invalidPostcode',
      hasNoResults: false,
      postcode: undefined
    };
    expect(res.render).toBeCalledWith('postcode-search', expectedData);
  });

  test('Should render the postcode search page with no results', async () => {
    const req = mockRequest(i18n);
    req.query = {
      postcode: 'E1 8DY',
      noResults: 'true'
    };
    req.params = {
      service: 'money',
      serviceArea: 'tax'
    };
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData: PageData = {
      ...i18n['postcode-search'],
      path: '/search-by-postcode',
      actionUrl: '/services/money/tax/courts/near',
      error: false,
      hasNoResults: true,
      postcode: 'E1 8DY'
    };
    expect(res.render).toBeCalledWith('postcode-search', expectedData);
  });
});
