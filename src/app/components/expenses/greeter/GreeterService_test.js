export default

  // ---
  // Utilities.
  // ---
  var testUtils = require('helpers/tests');

  describe('GreeterService', function () {

    // Inject app
    beforeEach(function () {

      // ---
      // Provide APP_CONFIG.
      // ---
      angular.mock.module(testUtils.mockAppConfig);

      angular.mock.module('revaluate');
    });

    it('Should inject the service', inject(function (GreeterService) {
      expect(GreeterService).toBeTruthy();
    }));

    it('Should return a greet for every single datyime', inject(function (GreeterService) {
      expect(GreeterService.greet()).toBeTruthy();
      expect(GreeterService.greet()).toBeTruthy();
      expect(GreeterService.greet()).toBeTruthy();
      expect(GreeterService.greet()).toBeTruthy();
    }));

  });

