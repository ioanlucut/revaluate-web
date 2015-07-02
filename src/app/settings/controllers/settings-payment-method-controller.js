'use strict';

angular
    .module("revaluate.settings")
    .controller("SettingsEditPaymentMethodController", function ($q, $rootScope, $timeout, $http, AUTH_URLS, $braintree, clientToken, paymentInsights, flash, ALERTS_CONSTANTS, USER_ACTIVITY_EVENTS) {

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
        // Braintree client token got from server.
        // ---
        vm.clientToken = clientToken;

        // ---
        // Payment status.
        // ---
        vm.paymentInsights = paymentInsights;

        // ---
        // Braintree client.
        // ---
        vm.client = new $braintree.api.Client({
            clientToken: clientToken
        });

        /**
         * Initial payment data
         */
        function getInitialPaymentData() {
            return {
                cardNumber: '',
                cardExpirationDate: ''
            }
        }

        /**
         * Profile user information.
         */
        vm.paymentData = angular.copy(getInitialPaymentData());

        /**
         * Initial Payment details data
         */
        function getInitialPaymentDetailsData() {
            return {
                paymentMethodNonce: ''
            }
        }

        /**
         * Payment details data.
         */
        vm.paymentDetailsData = angular.copy(getInitialPaymentDetailsData());

        // ---
        // UPDATE PAYMENT METHOD RELATED
        // ---
        vm.updatePaymentMethod = function () {
            if ( vm.updatePaymentMethodForm.$valid && !vm.isRequestPending ) {

                // Show the loading bar
                vm.isRequestPending = true;

                // - Validate vm.paymentData
                // - Make sure client is ready to use
                vm
                    .client
                    .tokenizeCard({
                        number: vm.paymentData.cardNumber,
                        expirationDate: vm.paymentData.cardExpirationDate
                    }, function (err, nonce) {

                        if ( err ) {
                            flash.to(vm.alertIdentifierId).error = err;
                        }
                        else {
                            flash.to(vm.alertIdentifierId).error = '';

                            // ---
                            // Update details with the received nonce.
                            // ---
                            var paymentDetailsData = angular.copy(vm.paymentDetailsData);
                            paymentDetailsData.paymentMethodNonce = nonce;

                            return $http
                                .put(URLTo.api(AUTH_URLS.updatePaymentMethod), paymentDetailsData)
                                .then(function () {

                                    // ---
                                    // Reset the payment data with empty new data.
                                    // ---
                                    vm.paymentData = angular.copy(getInitialPaymentData());

                                    vm.updatePaymentMethodForm.$setPristine();

                                    $timeout(function () {
                                        vm.isRequestPending = false;
                                        flash.to(vm.alertIdentifierId).success = 'We\'ve successfully updated your payment method!';
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
                                        flash.to(vm.alertIdentifierId).error = 'We\'ve encountered an error while trying to update your payment method.';
                                    }
                                });
                        }
                    });
            }

        };

    });
