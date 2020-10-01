import { Response } from 'express';
import { FactRequest } from '../../interfaces/FactRequest';
import { PageData } from '../../interfaces/PageData';
import { hasProperty } from '../../utils/validation';

export class SearchOptionController {

  public get(req: FactRequest, res: Response): void {
    res.render('search/option', req.i18n.getDataByLanguage(req.lng).search.option);
  }

  public post(req: FactRequest, res: Response): void {
    if (!hasProperty(req.body, 'knowLocation')) {
      const data: PageData = {
        ...req.i18n.getDataByLanguage(req.lng).search.option,
        path: '/search-option',
        errors: true,
      };
      return res.render('search/option', data);
    }
    const knowLocation = req.body.knowLocation as string;
    if (knowLocation === 'yes') {
      return res.redirect('/location-search');
    }
    // TODO story if the user doesnt know the name
    return res.redirect('/');
  }
}