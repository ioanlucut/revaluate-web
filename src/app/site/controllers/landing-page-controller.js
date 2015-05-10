/**
 * Landing page controller.
 */
angular
    .module("revaluate.common")
    .controller("LandingPageController", function ($state, $scope, ACCOUNT_FORM_STATE, MIXPANEL_EVENTS) {

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.landingPageLoaded);
    });
