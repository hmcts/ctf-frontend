import { asClass, asValue, createContainer, InjectionMode } from 'awilix';
import Axios from 'axios';
import config from 'config';
import { FactApi } from './utils/FactApi';
import { SearchResultsController } from './controllers/search/SearchResultsController';
import { SearchOptionController } from './controllers/search/SearchOptionController';
import { HomeController } from './controllers/HomeController';
import { LocationSearchController } from './controllers/search/LocationSearchController';
import { ChooseActionController } from './controllers/ChooseActionController';
import { CourtDetailsController } from './controllers/CourtDetailsController';
import { ChooseServiceController } from './controllers/areaOfLaw/ChooseServiceController';
import { MoneyAreaOfLawController } from './controllers/areaOfLaw/MoneyAreaOfLawController';
import { FamilyAreaOfLawController } from './controllers/areaOfLaw/FamilyAreaOfLawController';
import { ChildcareAndParentingAreaOfLawController } from './controllers/areaOfLaw/ChildcareAndParentingAreaOfLawController';

const { Logger } = require('@hmcts/nodejs-logging');
const logger = Logger.getLogger('app');

export const container = createContainer({ injectionMode: InjectionMode.CLASSIC }).register({
  logger: asValue(logger),
  axios: asValue(Axios.create({ baseURL: config.get('services.api.url') })),
  api: asClass(FactApi),
  homeController: asClass(HomeController),
  searchOptionController: asClass(SearchOptionController),
  locationSearchController: asClass(LocationSearchController),
  searchResultsController: asClass(SearchResultsController),
  chooseActionController: asClass(ChooseActionController),
  courtDetailsController: asClass(CourtDetailsController),
  chooseServiceController: asClass(ChooseServiceController),
  moneyAreaOfLawController: asClass(MoneyAreaOfLawController),
  familyAreaOfLawController: asClass(FamilyAreaOfLawController),
  childcareAndParentingAreaOfLawController: asClass(ChildcareAndParentingAreaOfLawController),
  // areaOfLawController: asClass(AreaOfLawController)
});
