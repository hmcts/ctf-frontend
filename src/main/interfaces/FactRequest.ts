import { Request } from 'express';
import { SearchResultsData } from './SearchResultsData';

export interface FactRequest extends Request {
  i18n?: {
    getDataByLanguage: (lng: string) => {
      search: {
        option: {};
        location: SearchResultsData;
        results: {};
      };
      home: {};
      'choose-action': {};
      template: {};
      'court-details': {};
    };
  };
  lng?: string;
}
