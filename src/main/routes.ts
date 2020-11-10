import { Application } from 'express';
import { stringify } from 'querystring';

export default function(app: Application): void {

  app.get('/', app.locals.container.cradle.homeController.get);
  app.get('/search-option', app.locals.container.cradle.searchOptionController.get);
  app.post('/search-option', app.locals.container.cradle.searchOptionController.post);
  app.get('/search-by-name', app.locals.container.cradle.locationSearchController.get);
  app.get('/courts', app.locals.container.cradle.searchResultsController.get);
  app.get('/service-choose-action', app.locals.container.cradle.chooseActionController.get);
  app.post('/service-choose-action', app.locals.container.cradle.chooseActionController.post);
  app.get('/courts/:slug', app.locals.container.cradle.courtDetailsController.get);
  app.get('/individual-location-pages/courts/:slug', app.locals.container.cradle.courtDetailsController.get);
  app.get('/services/unknown-service', app.locals.container.cradle.chooseUnknownServiceController.get);
  app.get('/services/:action', app.locals.container.cradle.chooseServiceController.get);
  app.post('/services/:action', app.locals.container.cradle.chooseServiceController.post);
  app.get('/services/:service/service-areas/:action', app.locals.container.cradle.chooseServiceAreaController.get);
  app.post('/services/:service/service-areas/:action', app.locals.container.cradle.chooseServiceAreaController.post);
  app.get('/services/:service/:serviceArea/search-results', app.locals.container.cradle.serviceSearchResultsController.get);

  // legacy urls
  app.get('/search', (req, res) => res.redirect(301, '/search-option'));
  app.get('/search/address', (req, res) => res.redirect(301, '/search-by-name'));
  app.get('/search/courtcode', (req, res) => res.redirect(301, '/search-by-name'));
  app.get('/search/aol', (req, res) => res.redirect(301, '/services'));
  app.get('/search/spoe', (req, res) => res.redirect(301, '/service-choose-action'));

  app.get('/search/postcode', (req, res) => {
    const params = stringify(req.query as any);

    if (req.query.aol === 'Adoption') {
      res.redirect(301, '/services/childcare-and-parenting/service-areas/adoption/search-by-postcode?' + params);
    } else if (req.query.aol === 'Bankruptcy') {
      res.redirect(301, '/services/money/service-areas/bankruptcy/search-by-postcode?' + params);
    } else if (req.query.aol === 'Social security') {
      res.redirect(301, '/services/money/service-areas/benefits/search-by-postcode?' + params);
    } else if (req.query.aol === 'Children') {
      res.redirect(301, '/services/childcare-and-parenting/service-areas/childcare-arrangements/search-by-postcode?' + params);
    } else if (req.query.aol === 'Civil partnership') {
      res.redirect(301, '/services/probate-divorce-or-ending-civil-partnerships/service-areas/civil-partnership/search-by-postcode?' + params);
    } else if (req.query.aol === 'Employment') {
      res.redirect(301, '/services/money/service-areas/claims-against-employers/search-by-postcode?' + params);
    } else if (req.query.aol === 'Crime') {
      res.redirect(301, '/services/crime/service-areas/major-criminal-offences/search-by-postcode?' + params);
    } else if (req.query.aol === 'Minor crime') {
      res.redirect(301, '/services/crime/service-areas/minor-criminal-offences/search-by-postcode?' + params);
    } else if (req.query.aol === 'Divorce') {
      res.redirect(301, '/services/probate-divorce-or-ending-civil-partnerships/service-areas/divorce/search-by-postcode?' + params);
    } else if (req.query.aol === 'Domestic violence') {
      res.redirect(301, '/services/harm-and-abuse/service-areas/domestic-abuse/search-by-postcode?' + params);
    } else if (req.query.aol === 'Forced marriage and FGM') {
      res.redirect(301, '/services/harm-and-abuse/service-areas/forced-marriage/search-by-postcode?' + params);
    } else if (req.query.aol === 'Housing possession') {
      res.redirect(301, '/services/money/service-areas/housing/search-by-postcode?' + params);
    } else if (req.query.aol === 'High Court District Registry') {
      res.redirect(301, '/services/high-court-district-registries/service-areas/high-court-district-registries/search-by-postcode?' + params);
    } else if (req.query.aol === 'Immigration') {
      res.redirect(301, '/services/immigration-and-asylum/service-areas/immigration/search-by-postcode?' + params);
    } else if (req.query.aol === 'Money claims') {
      res.redirect(301, '/services/money/service-areas/money-claims/search-by-postcode?' + params);
    } else if (req.query.aol === 'Probate') {
      res.redirect(301, '/services/money/service-areas/probate/search-by-postcode?' + params);
    } else {
      res.redirect(301, '/services/unknown-service');
    }
  });

  app.get('/search/results', (req, res) => {
    if (req.query.postcode) {
      res.redirect(301, '/courts/near?' + stringify(req.query as any));
    } else if (req.query.q) {
      res.redirect(301, '/courts?search=' + (req.query.q || ''));
    } else {
      res.redirect(301, '/search-by-name');
    }
  });

  // A-Z court pages
  for (const letter of 'abcdefghijklmnopqrstuvwxyz'.split('')) {
    app.get('/courts/' + letter.toUpperCase(), (req, res) => res.redirect(301, '/search-option'));
  }

}
