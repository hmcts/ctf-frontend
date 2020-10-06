import { Application } from 'express';

export default function(app: Application): void {

  app.get('/', app.locals.container.cradle.homeController.get);
  app.get('/search-option', app.locals.container.cradle.searchOptionController.get);
  app.post('/search-option', app.locals.container.cradle.searchOptionController.post);
  app.get('/location-search', app.locals.container.cradle.locationSearchController.get);
  app.get('/search-for-location', app.locals.container.cradle.searchResultsController.get);

}
