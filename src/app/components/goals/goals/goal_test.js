export default

  // ---
  // Utilities.
  // ---
  var testUtils = require('helpers/tests');

  describe('Goal', function () {

    // Inject app
    beforeEach(function () {

      // ---
      // Provide APP_CONFIG.
      // ---
      angular.mock.module(testUtils.mockAppConfig);

      angular.mock.module('revaluate');
    });

    it('Should inject the service', inject(function (Goal) {
      expect(Goal).toBeTruthy();
    }));

    it('Should be able to instantiate correctly', inject(function (Goal) {

      var goalDto = {
          id: '1',
          value: 1.2,
        },
        actual = Goal.build(goalDto);

      expect(actual).toBeTruthy();
      expect(actual.id).toEqual(goalDto.id);
      expect(actual.value).toEqual(goalDto.value);
    }));
  });

