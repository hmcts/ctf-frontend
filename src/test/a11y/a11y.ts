import { fail } from 'assert';

const pa11y = require('pa11y');
import * as supertest from 'supertest';
import { app } from '../../main/app';

const agent = supertest.agent(app);

const startPage = '/';
const searchOptionPage = '/search-option';
const locationSearchPage = '/location-search';
const serviceChooseActionPage = '/service-choose-action';

class Pa11yResult {
  documentTitle: string;
  pageUrl: string;
  issues: PallyIssue[];
}

class PallyIssue {
  code: string;
  context: string;
  message: string;
  selector: string;
  type: string;
  typeCode: number;
}

beforeAll((done /* call it or remove it*/) => {
  done(); // calling it
});

function ensurePageCallWillSucceed(url: string): Promise<void> {
  return agent.get(url).then((res: supertest.Response) => {
    if (res.redirect) {
      throw new Error(
        `Call to ${url} resulted in a redirect to ${res.get('Location')}`,
      );
    }
    if (res.serverError) {
      throw new Error(`Call to ${url} resulted in internal server error`);
    }
  });
}

function runPallyWith(url: string, actions: string[]): Pa11yResult {
  return pa11y(url, {
    hideElements: '.govuk-footer__licence-logo, .govuk-header__logotype-crown',
    actions: actions
  });
}

function expectNoErrors(messages: PallyIssue[]): void {
  const errors = messages.filter(m => m.type === 'error');

  if (errors.length > 0) {
    const errorsAsJson = `${JSON.stringify(errors, null, 2)}`;
    fail(`There are accessibility issues: \n${errorsAsJson}\n`);
  }
}

function testAccessibilityWithActions(url: string, actions: string[]): void {
  describe(`Page ${url}`, () => {
    test('should have no accessibility errors', done => {
      ensurePageCallWillSucceed(url)
        .then(() => runPallyWith(agent.get(url).url, actions))
        .then((result: Pa11yResult) => {
          expectNoErrors(result.issues);
          done();
        })
        .catch((err: Error) => done(err));
    });
  });
}

function testAccessibility(url: string): void {
  testAccessibilityWithActions(url, []);
}

function testAccessibilityOfFormError(url: string) {
  testAccessibilityWithActions(url, [
    'click element .govuk-button'
  ]);
}

describe('Accessibility', () => {
  testAccessibility(startPage);

  testAccessibility(searchOptionPage);
  testAccessibilityOfFormError(searchOptionPage);

  testAccessibility(locationSearchPage);
  testAccessibilityOfFormError(locationSearchPage);

  testAccessibility(serviceChooseActionPage);
  testAccessibilityOfFormError(serviceChooseActionPage);
});
