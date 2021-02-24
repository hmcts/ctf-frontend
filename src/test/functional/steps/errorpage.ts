import { Given } from 'cucumber';

import { config } from '../../config';
import * as I from '../utlis/puppeteer.util';

Given('I am on FACT error page', async function() {
  await I.newPage();
  await I.goTo(config.TEST_URL + '/service-problem');
});
