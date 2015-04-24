/**
 * 404 page controller.
 */
angular
    .module("common")
    .controller("Error404PageController", function ($scope, $controller, MIXPANEL_EVENTS) {

        /**
         * Inherit from this controller
         */
        $controller('AbstractErrorPageController', { $scope: $scope });

        /**
         * Track error event
         */
        $scope.trackErrorEvent(MIXPANEL_EVENTS.error404);
    });
