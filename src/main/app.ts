import { glob } from 'glob';

const { Express, Logger } = require('@hmcts/nodejs-logging');

import * as bodyParser from 'body-parser';
import config = require('config');
import cookieParser from 'cookie-parser';
import express from 'express';
import { Helmet } from './modules/helmet';
import * as path from 'path';
import favicon from 'serve-favicon';
import { HTTPError } from 'HttpError';
import { Nunjucks } from './modules/nunjucks';
import { I18next } from './modules/i18next';
const { setupDev } = require('./development');

const env = process.env.NODE_ENV || 'development';
const developmentMode = env === 'development';

export const app = express();
app.locals.ENV = env;

// setup logging of HTTP requests
app.use(Express.accessLogger());

const logger = Logger.getLogger('app');

new Nunjucks(developmentMode).enableFor(app);
// secure the application by adding various HTTP headers to its responses
new Helmet(config.get('security')).enableFor(app);

new I18next().enableFor(app);

app.use(favicon(path.join(__dirname, '/public/assets/images/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.setHeader(
    'Cache-Control',
    'no-cache, max-age=0, must-revalidate, no-store',
  );
  next();
});

glob.sync(__dirname + '/routes/**/*.+(ts|js)')
  .map(filename => require(filename))
  .forEach(route => route.default(app));

setupDev(app,developmentMode);
// returning "not found" page for requests with paths not resolved by the router
app.use((req: any, res: any) => {
  res.status(404);
  const data = req.i18n.getDataByLanguage(req.lng).notFound;
  res.render('not-found', data);
});

// error handler
app.use((err: HTTPError, req: any, res: express.Response) => {
  logger.error(`${err.stack || err}`);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = env === 'development' ? err : {};
  res.status(err.status || 500);
  const data = req.i18n.getDataByLanguage(req.lng).error;
  res.render('error', data);
});
