// ---
// Utilities.
// ---
import * as testUtils from './../../../../helpers/tests';

describe('GoalTransformerService', function () {

  // Inject app
  beforeEach(function () {

    // ---
    // Provide APP_CONFIG.
    // ---
    angular.mock.module(testUtils.mockAppConfig);

    angular.mock.module('revaluate');
  });

  it('Should inject the service', inject(function (GoalTransformerService) {
    expect(GoalTransformerService).toBeTruthy();
  }));

});

