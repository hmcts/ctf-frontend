import { FactRequest } from '../interfaces/FactRequest';
import { Response } from 'express';
import { hasProperty } from '../utils/validation';
import { PageData } from '../interfaces/PageData';

export class ChooseActionController {
  public get(req: FactRequest, res: Response): void {
    res.render('choose-action', req.i18n.getDataByLanguage(req.lng)['choose-action']);
  }

  public post(req: FactRequest, res: Response): void {
    if (!hasProperty(req.body, 'chooseAction')) {
      const data: PageData = {
        ...req.i18n.getDataByLanguage(req.lng)['choose-action'],
        path: '/service-choose-action',
        errors: true,
      };
      return res.render('choose-action', data);
    }
    // TODO story for user choosing court option
    res.redirect('/');
  }
}