'use strict';

/**
 * 404 page controller.
 */
export default angular
    .module('revaluate.common')
    .controller('Error404PageController', function ($scope, $controller, USER_ACTIVITY_EVENTS) {

        /**
         * Inherit from this controller
         */
        $controller('AbstractErrorPageController', { $scope: $scope });

        /**
         * Track error event
         */
        $scope.trackErrorEvent(USER_ACTIVITY_EVENTS.error404);
    })
    .name;
