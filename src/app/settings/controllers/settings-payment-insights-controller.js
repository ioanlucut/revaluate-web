angular
    .module("revaluate.settings")
    .controller("SettingsPaymentInsightsController", function ($q, $state, $scope, $rootScope, $timeout, $http, paymentInsights, flash, AUTH_URLS, ALERTS_CONSTANTS, MIXPANEL_EVENTS, AUTH_EVENTS, USER_SUBSCRIPTION_STATUS) {

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
        // Payment insights got from server.
        // ---
        $scope.paymentInsights = paymentInsights;

        // ---
        // On submit, perform payment subscription.
        // ---
        $scope.performPaymentSubscription = function () {
            if ( !$scope.isRequestPending ) {

                // Show the loading bar
                $scope.isRequestPending = true;

                return $http
                    .post(URLTo.api(AUTH_URLS.subscribeToStandardPlan), {})
                    .then(function (response) {
                        $scope.paymentInsights = response.data;

                        // ---
                        // Update user with subscription status ACTIVE.
                        // ---
                        $scope
                            .user
                            .setSubscriptionStatusAsAndReload(USER_SUBSCRIPTION_STATUS.ACTIVE);
                        $rootScope
                            .$broadcast(AUTH_EVENTS.refreshUser, {});

                        // ---
                        // Clean previously errors.
                        // ---
                        flash.to(ALERTS_CONSTANTS.generalError).error = '';

                        $timeout(function () {
                            $scope.isRequestPending = false;
                            flash.to($scope.alertIdentifierId).success = 'You\'ve successfully subscribed to Revaluate!';
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
                            flash.to($scope.alertIdentifierId).error = 'We\'ve encountered an error while trying to subscribe you to Revaluate.';
                        }
                    });

            }

        };

        // ---
        // Remove payment method.
        // ---
        $scope.performRemovePayment = function () {
            if ( !$scope.isRequestPending ) {

                // Show the loading bar
                $scope.isRequestPending = true;

                return $http
                    .delete(URLTo.api(AUTH_URLS.removePaymentMethod), {})
                    .then(function () {

                        // ---
                        // Update user with subscription status.
                        // ---
                        $scope
                            .user
                            .resetSubscriptionStatusAfterRemovePaymentIsPerformed();
                        $rootScope
                            .$broadcast(AUTH_EVENTS.refreshUser, {});

                        flash.to($scope.alertIdentifierId).success = 'You\'ve successfully removed payment method!';

                        $timeout(function () {
                            $scope.isRequestPending = false;

                            // ---
                            // If successful, go to expenses.
                            // ---
                            $state.go("expenses.regular");
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
                            flash.to($scope.alertIdentifierId).error = 'We\'ve encountered an error while trying to remove payment method';
                        }
                    });

            }

        };

    });