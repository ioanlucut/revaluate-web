angular
    .module("revaluate.settings")
    .controller("SettingsPaymentInsightsController", function ($q, $state, $rootScope, $timeout, $http, paymentInsights, flash, AUTH_URLS, ALERTS_CONSTANTS, MIXPANEL_EVENTS, AUTH_EVENTS, USER_SUBSCRIPTION_STATUS) {

        /* jshint validthis: true */
        var vm = this;

        var TIMEOUT_PENDING = 300;

        /**
         * Alert identifier
         */
        vm.alertIdentifierId = ALERTS_CONSTANTS.paymentProfile;

        /**
         * Current user.
         */
        vm.user = $rootScope.currentUser;

        // ---
        // Payment insights got from server.
        // ---
        vm.paymentInsights = paymentInsights;

        // ---
        // On submit, perform payment subscription.
        // ---
        vm.performPaymentSubscription = function () {
            if ( !vm.isRequestPending ) {

                // Show the loading bar
                vm.isRequestPending = true;

                return $http
                    .post(URLTo.api(AUTH_URLS.subscribeToStandardPlan), {})
                    .then(function (response) {
                        vm.paymentInsights = response.data;

                        // ---
                        // Update user with subscription status ACTIVE.
                        // ---
                        vm
                            .user
                            .setSubscriptionStatusAsAndReload(USER_SUBSCRIPTION_STATUS.ACTIVE);
                        $rootScope
                            .$broadcast(AUTH_EVENTS.refreshUser, {});

                        // ---
                        // Clean previously errors.
                        // ---
                        flash.to(ALERTS_CONSTANTS.generalError).error = '';

                        $timeout(function () {
                            vm.isRequestPending = false;
                            flash.to(vm.alertIdentifierId).success = 'You\'ve successfully subscribed to Revaluate!';
                        }, TIMEOUT_PENDING);
                    })
                    .catch(function (response) {
                        /* If bad feedback from server */
                        vm.badPostSubmitResponse = true;
                        vm.isRequestPending = false;

                        // ---
                        // Show errors.
                        // ---
                        var errors = response.data;
                        if ( _.isArray(errors) ) {
                            flash.to(vm.alertIdentifierId).error = errors.join("\n");
                        }
                        else {
                            flash.to(vm.alertIdentifierId).error = 'We\'ve encountered an error while trying to subscribe you to Revaluate.';
                        }
                    });

            }

        };

        // ---
        // Remove payment method.
        // ---
        vm.performRemovePayment = function () {
            if ( !vm.isRequestPending ) {

                // Show the loading bar
                vm.isRequestPending = true;

                return $http
                    .delete(URLTo.api(AUTH_URLS.removePaymentMethod), {})
                    .then(function () {

                        // ---
                        // Update user with subscription status.
                        // ---
                        vm
                            .user
                            .resetSubscriptionStatusAfterRemovePaymentIsPerformed();
                        $rootScope
                            .$broadcast(AUTH_EVENTS.refreshUser, {});

                        flash.to(vm.alertIdentifierId).success = 'You\'ve successfully removed payment method!';

                        $timeout(function () {
                            vm.isRequestPending = false;

                            // ---
                            // If successful, go to expenses.
                            // ---
                            $state.go("expenses.regular");
                        }, TIMEOUT_PENDING);
                    })
                    .catch(function (response) {
                        /* If bad feedback from server */
                        vm.badPostSubmitResponse = true;
                        vm.isRequestPending = false;

                        // ---
                        // Show errors.
                        // ---
                        var errors = response.data;
                        if ( _.isArray(errors) ) {
                            flash.to(vm.alertIdentifierId).error = errors.join("\n");
                        }
                        else {
                            flash.to(vm.alertIdentifierId).error = 'We\'ve encountered an error while trying to remove payment method';
                        }
                    });

            }

        };

    });