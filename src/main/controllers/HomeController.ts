import { Response } from 'express';
import { FactRequest } from '../interfaces/FactRequest';

export class HomeController {
  public get(req: FactRequest, res: Response): void {
    res.render('home', req.i18n.getDataByLanguage(req.lng).home);
  }
}
