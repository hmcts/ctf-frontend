import { Application } from 'express';

export default function(app: Application): void {

  app.get('/', app.locals.container.cradle.homeController.get);
  app.get('/search-option', app.locals.container.cradle.searchOptionController.get);
  app.post('/search-option', app.locals.container.cradle.searchOptionController.post);
  app.get('/location-search', app.locals.container.cradle.locationSearchController.get);
  app.get('/search-for-location', app.locals.container.cradle.searchResultsController.get);
  app.get('/service-choose-action', app.locals.container.cradle.chooseActionController.get);
  app.post('/service-choose-action', app.locals.container.cradle.chooseActionController.post);
  app.get('/individual-location-pages/courts/:slug', app.locals.container.cradle.courtDetailsController.get);
  app.get('/services', app.locals.container.cradle.chooseServiceController.get);
  app.post('/services', app.locals.container.cradle.chooseServiceController.post);
  app.get('/services/money/service-areas', app.locals.container.cradle.moneyAreaOfLawController.get);
  app.post('/services/money/service-areas', app.locals.container.cradle.moneyAreaOfLawController.post);
  app.get('/services/probate-divorce-or-ending-civil-partnerships/service-areas', app.locals.container.cradle.familyAreaOfLawController.get);
  app.post('/services/probate-divorce-or-ending-civil-partnerships/service-areas', app.locals.container.cradle.familyAreaOfLawController.post);
  app.get('/services/childcare-and-parenting/service-areas', app.locals.container.cradle.childcareAndParentingAreaOfLawController.get);
  app.post('/services/childcare-and-parenting/service-areas', app.locals.container.cradle.childcareAndParentingAreaOfLawController.post);
  // app.get('/services/{areaOfLaw}/service-areas', app.locals.container.cradle.areaOfLawController.get);
  // app.post('/services/{areaOfLaw}/service-areas', app.locals.container.cradle.areaOfLawController.post);
}
