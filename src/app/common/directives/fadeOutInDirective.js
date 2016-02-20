(function () {
  'use strict';

  angular
    .module('revaluate.common')
    .directive('fadeOutIn', function () {
      return {
        restrict: 'A',
        link: function (scope, el, attrs) {
          var FADE_DURATION = 500,
            FADE_IN_OPACITY_VALUE = 1,
            FADE_OUT_OPACITY_VALUE = 0.5;

          scope.$watch(attrs.fadeWhen, function (val, valOld) {
            if (_.isUndefined(val) && _.isUndefined(valOld)) {
              return;
            }

            if (val === true && valOld === false || _.isUndefined(valOld)) {
              el.fadeTo(FADE_DURATION, FADE_OUT_OPACITY_VALUE);
            } else {
              el.fadeTo(FADE_DURATION, FADE_IN_OPACITY_VALUE);
            }
          });
        },
      };
    });
}());
