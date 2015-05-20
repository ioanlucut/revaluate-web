angular
    .module("revaluate.settings")
    .controller("SettingsPaymentInsightsController", function ($q, $scope, $rootScope, $timeout, paymentInsights, flash, ALERTS_CONSTANTS, MIXPANEL_EVENTS) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.paymentProfile;

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.settingsPayment);

        /**
         * Current user.
         */
        $scope.user = $rootScope.currentUser;

        // ---
        // Payment insights got from server.
        // ---
        $scope.paymentInsights = paymentInsights;

    });