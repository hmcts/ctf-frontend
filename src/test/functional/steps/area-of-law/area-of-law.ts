import { Given, Then } from 'cucumber';

import * as I from '../../utlis/puppeteer.util';
import { expect } from 'chai';

Given('I continue having selected an {string} from that page', async (option: string) => {
  let element;
  switch(option) {
    case 'money': {
      element = '#money';
      break;
    }
    case 'family': {
      element = '#probate-divorce-or-ending-civil-partnerships';
      break;
    }
    case 'childcare': {
      element = '#childcare-and-parenting';
      break;
    }
    case 'harm': {
      element = '#harm-and-abuse';
      break;
    }
    case 'immigration': {
      element = '#immigration-and-asylum';
      break;
    }
    case 'crime': {
      element = '#crime';
      break;
    }
    case 'high courts': {
      element = '#high-court-district-registries';
      break;
    }
    default: {
      element = '#not-listed';
      break;
    }
  }
  await I.click(element);
});

Given('I continue having not selected an area of law option', async() => {
  await I.click('.continue');
});

Then('I am presented with an error message for services', async() => {
  const elementExist = await I.checkElement('#choose-service-error');
  expect(elementExist).equal(true);
});
