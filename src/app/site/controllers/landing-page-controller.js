/**
 * Landing page controller.
 */
angular
    .module("common")
    .controller("LandingPageCtrl", function ($state, $scope, ACCOUNT_FORM_STATE, MIXPANEL_EVENTS) {

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.landingPageLoaded);
    });
