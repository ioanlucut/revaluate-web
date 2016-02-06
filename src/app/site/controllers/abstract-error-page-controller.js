'use strict';

/**
 * Abstract error page controller.
 */
export default angular
    .module('revaluate.common')
    .controller('AbstractErrorPageController', function ($scope, StatesHandler) {

        /**
         * Track event.
         */
        $scope.trackErrorEvent = function (event) {
            $scope.$broadcast('trackEvent', event);
        };

        /**
         * Continues to home page.
         */
        $scope.goToHomePage = function () {
            StatesHandler.goHome();
        };
    })
    .name;
