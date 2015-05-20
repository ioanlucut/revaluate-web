angular
    .module("revaluate.settings")
    .controller("SettingsPaymentSubscribeController", function ($q, $scope, $rootScope, $timeout, $http, AUTH_URLS, flash, ALERTS_CONSTANTS, MIXPANEL_EVENTS) {

        var TIMEOUT_PENDING = 300;

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
        // On submit, perform payment subscription.
        // ---
        $scope.performPaymentSubscription = function () {
            if ( !$scope.isRequestPending ) {

                // Show the loading bar
                $scope.isRequestPending = true;

                return $http
                    .post(URLTo.api(AUTH_URLS.subscribeToStandardPlan), {})
                    .then(function () {

                        flash.to($scope.alertIdentifierId).success = 'We\'ve successfully subscribed you to a revaluate subscription!';

                        $timeout(function () {
                            $scope.isRequestPending = false;
                        }, TIMEOUT_PENDING);
                    })
                    .catch(function (response) {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;
                        $scope.isRequestPending = false;

                        // ---
                        // Show errors.
                        // ---
                        var errors = response.data;
                        if ( _.isArray(errors) ) {
                            flash.to($scope.alertIdentifierId).error = errors.join("\n");
                        }
                        else {
                            flash.to($scope.alertIdentifierId).error = 'We\'ve encountered an error while trying to subscribed you to revaluate subscription.';
                        }
                    });

            }

        };

    });