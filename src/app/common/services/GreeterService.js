(function () {
  'use strict';

  angular
    .module('revaluate.common')
    .service('GreeterService', function ($rootScope, GREETER_CONSTANTS) {

      function getRandomized(greeterDayTime) {

        return greeterDayTime.greets[Math.floor(Math.random() * greeterDayTime.greets.length)];
      }

      this.greet = function () {
        var hour = moment().hour();

        if (hour > 0 && hour <= 6) {
          return getRandomized(GREETER_CONSTANTS.NIGHT);
        } else if (hour > 6 && hour <= 12) {
          return getRandomized(GREETER_CONSTANTS.MORNING);
        } else if (hour > 12 && hour <= 18) {
          return getRandomized(GREETER_CONSTANTS.DAY);
        } else {
          return getRandomized(GREETER_CONSTANTS.EVENING);
        }
      };
    });
}());
