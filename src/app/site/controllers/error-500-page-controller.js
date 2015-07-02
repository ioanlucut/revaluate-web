'use strict';

/**
 * 500 page controller.
 */
angular
    .module("revaluate.common")
    .controller("Error500PageController", function ($scope, $controller, USER_ACTIVITY_EVENTS) {

        /**
         * Inherit from this controller
         */
        $controller('AbstractErrorPageController', { $scope: $scope });

        /**
         * Track error event
         */
        $scope.trackErrorEvent(USER_ACTIVITY_EVENTS.error500);
    });
