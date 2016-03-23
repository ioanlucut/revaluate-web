// ---
// Utilities.
// ---
import * as testUtils from './../../../../helpers/tests';

describe('ExpenseTransformerService', function () {

  // Inject app
  beforeEach(function () {

    // ---
    // Provide APP_CONFIG.
    // ---
    angular.mock.module(testUtils.mockAppConfig);

    angular.mock.module('revaluate');
  });

  it('Should inject the service', inject(function (ExpenseTransformerService) {
    expect(ExpenseTransformerService).toBeTruthy();
  }));

});

