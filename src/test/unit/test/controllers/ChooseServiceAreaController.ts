import { mockRequest } from '../../utils/mockRequest';
import { mockResponse } from '../../utils/mockResponse';
import { PageData } from '../../../../main/interfaces/PageData';
import { ChooseServiceAreaController } from '../../../../main/controllers/service/ChooseServiceAreaController';
import { cloneDeep } from 'lodash';

const i18n = {
  service: {
    name: '',
    description: '',
    title: '',
    question: '',
    error: {
      text: ''
    },
  },
};

describe('Choose service area controller', () => {
  const response: any = { data: {}, serviceData: {} };
  const api: any = {
    serviceAreas: async () => response.data,
    getService: async () => response.serviceData
  };
  const controller = new ChooseServiceAreaController(api);

  test('Should render a service areas page', async () => {
    response.data = [{
      name: 'Service area',
      description: 'service area description',
    }];

    response.serviceData = {
      name: 'Service',
      description: 'service description',
      slug: 'slug',
    };

    const req = mockRequest(i18n);
    req.params = {
      service: 'Chosen Service'
    };
    const res = mockResponse();
    await controller.get(req, res);
    const expectedData: PageData = {
      ...cloneDeep(i18n.service),
      path: '/services/' + req.params.service + '/service-areas',
      results: response.data,
      errors: false,
    };
    expect(res.render).toBeCalledWith('service', expectedData);
  });

  test('Should render a service area page with errors if no data has been entered', async () => {
    response.data = [{
      name: 'Service area',
      description: 'service area description',
    }];

    response.serviceData = {
      name: 'Service',
      description: 'service description',
      slug: 'slug',
    };

    const req = mockRequest(i18n);
    req.params = {
      service: 'Chosen Service'
    };
    req.body = {};
    const res = mockResponse();
    await controller.post(req, res);

    const expectedData: PageData = {
      ...cloneDeep(i18n.service),
      path: '/services/' + req.params.service + '/service-areas',
      results: response.data,
      errors: true
    };
    expect(res.render).toBeCalledWith('service', expectedData);
  });

  test('Should redirect to a particular service area', async () => {
    response.data = [{
      name: 'Service area',
      description: 'service area description',
    }];
    const req = mockRequest(i18n);
    req.params = {
      service: 'Chosen Service'
    };
    req.body = {
      serviceArea: 'chosen service area',
    };
    const res = mockResponse();
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/services/unknown-service');
  });
});
