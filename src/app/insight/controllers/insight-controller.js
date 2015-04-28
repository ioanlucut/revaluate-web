/**
 * expenses controller.
 */
angular
    .module("insights")
    .controller("InsightController", function ($scope, $rootScope, $timeout, insight, MIXPANEL_EVENTS) {

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.insightsPage);

        $scope.insight = insight;
    });