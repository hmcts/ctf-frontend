import { PageData } from '../../../../main/interfaces/PageData';
import { mockRequest } from '../../utils/mockRequest';
import { mockResponse } from '../../utils/mockResponse';
import { CourtDetailsController } from '../../../../main/controllers/CourtDetailsController';
const expectedCourtDetails = require('../../../resources/court-details-results.json');
const expectedNotInPersonCourtDetails = require('../../../resources/not-in-person-court-details-results.json');

const i18n = {
  'court-details': {
    notInPersonP1: '',
    catchmentArea: {
      area1: '',
      area2: ''
    }
  }
};

describe('CourtDetailsController', () => {
  const response = {
    data: expectedCourtDetails
  };
  const api: any = { court: async () => response.data };
  const controller = new CourtDetailsController(api);
  const nextFunction = jest.fn();

  test('Should render the court details page with results', async () => {
    const req = mockRequest(i18n);
    req.params = {
      slug: 'London'
    };
    req.hostname = 'testHost';
    const res = mockResponse();
    await controller.get(req, res, nextFunction);
    const expectedData: PageData = {
      ...i18n['court-details'],
      fullPath: req.hostname + '/courts/London',
      path: '/courts/London',
      results: {
        ...response.data,
        enquiries: {
          email: undefined,
          fax: undefined,
          phone: [],
          welshPhone: []
        }
      }
    };
    expect(res.render).toBeCalledWith('court-details/in-person-court', expectedData);
  });

  test('Should render the court details page with results with no imageurl', async () => {
    const req = mockRequest(i18n);
    req.params = {
      slug: 'London'
    };
    req.hostname = 'testHost';
    const res = mockResponse();
    response.data['image_file'] = null;
    await controller.get(req, res, nextFunction);
    const expectedData: PageData = {
      ...i18n['court-details'],
      fullPath: req.hostname + '/courts/London',
      path: '/courts/London',
      results: {
        ...response.data,
        'image_file': null,
        enquiries: {
          email: undefined,
          fax: undefined,
          phone: [],
          welshPhone: []
        }
      }
    };
    expect(res.render).toBeCalledWith('court-details/in-person-court', expectedData);
  });

  test('Should render the court details page for not in person', async () => {
    response.data = expectedNotInPersonCourtDetails;
    const req = mockRequest(i18n);
    req.params = {
      slug: 'Not-London'
    };
    req.hostname = 'testHost';
    const res = mockResponse();
    await controller.get(req, res, nextFunction);
    const expectedData: PageData = {
      ...i18n['court-details'],
      fullPath: req.hostname + '/courts/Not-London',
      path: '/courts/Not-London',
      results: {
        ...response.data,
        enquiries: {
          email: undefined,
          fax: undefined,
          phone: [],
          welshPhone: []
        }
      }
    };
    expect(res.render).toBeCalledWith('court-details/not-in-person-court', expectedData);
  });

  test('Should render the court details page with no results for empty slug', async () => {
    const req = mockRequest(i18n);
    req.params = {
      slug: ''
    };
    const res = mockResponse();
    await controller.get(req, res, nextFunction);
    expect(nextFunction).toBeCalled();
  });

  test('Should render the court details page with no results for no court returned from api', async () => {
    response.data = '';
    const req = mockRequest(i18n);
    req.params = {
      slug: 'somewhere'
    };
    const res = mockResponse();
    await controller.get(req, res, nextFunction);
    expect(nextFunction).toBeCalled();
  });
});
