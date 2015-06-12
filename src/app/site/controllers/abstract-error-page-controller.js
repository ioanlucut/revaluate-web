'use strict';

/**
 * Abstract error page controller.
 */
angular
    .module("revaluate.common")
    .controller("AbstractErrorPageController", function ($scope, StatesHandler) {

        /**
         * Track event.
         */
        $scope.trackErrorEvent = function (event) {
            mixpanel.track(event);
        };

        /**
         * Continues to home page.
         */
        $scope.goToHomePage = function () {
            StatesHandler.goHome();
        };
    });
