import { mockRequest } from '../../utils/mockRequest';
import { mockResponse } from '../../utils/mockResponse';
import { ChooseActionController } from '../../../../main/controllers/ChooseActionController';
import { PageData } from '../../../../main/interfaces/PageData';

const i18n = {
  'choose-action': {},
};

describe('Choose Action Controller', () => {
  const controller = new ChooseActionController();

  test('Should render the choose action page', async () => {
    const req = mockRequest(i18n);
    const res = mockResponse();
    await controller.get(req, res);
    expect(res.render).toBeCalledWith('choose-action', i18n['choose-action']);
  });

  // TODO story for the user choosing court option (nearest court)
  test('Should redirect to the nearest court', async () => {
    const req = mockRequest(i18n);
    req.body = {
      chooseAction: 'nearest-court',
    };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/');
  });

  // TODO story for the user choosing court option (court for documents)
  test('Should redirect to the nearest court', async () => {
    const req = mockRequest(i18n);
    req.body = {
      chooseAction: 'document-court',
    };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/');
  });

  // TODO story for the user choosing court option (court for updates)
  test('Should redirect to the nearest court', async () => {
    const req = mockRequest(i18n);
    req.body = {
      chooseAction: 'update-court',
    };
    const res = mockResponse();
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/');
  });

  test('Should render Choose Action page with errors if no data has been entered', async () => {
    const req = mockRequest(i18n);
    req.body = {};
    const res = mockResponse();
    await controller.post(req, res);
    const expectedData: PageData = {
      ...i18n['choose-action'],
      path: '/service-choose-action',
      errors: true,
    };
    expect(res.render).toBeCalledWith('choose-action', expectedData);
  });
});