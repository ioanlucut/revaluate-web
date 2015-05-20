angular
    .module("revaluate.settings")
    .controller("SettingsPaymentMethodAddController", function ($q, $scope, $state, $rootScope, $timeout, $http, AUTH_URLS, $braintree, clientToken, paymentStatus, flash, ALERTS_CONSTANTS, MIXPANEL_EVENTS) {

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
        // Braintree client token got from server.
        // ---
        $scope.clientToken = clientToken;

        // ---
        // Payment status.
        // ---
        $scope.paymentStatus = paymentStatus;

        // ---
        // Braintree client.
        // ---
        $scope.client = new $braintree.api.Client({
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
        $scope.paymentData = angular.copy(getInitialPaymentData());

        /**
         * Initial payment details data
         */
        function getInitialPaymentDetailsData() {
            return {
                paymentCustomerDetailsDTO: {
                    firstName: $scope.user.model.firstName,
                    lastName: $scope.user.model.lastName,
                    email: $scope.user.model.email
                },
                paymentNonceDetailsDTO: {
                    paymentMethodNonce: ''
                }
            }
        }

        /**
         * Payment details data.
         */
        $scope.paymentDetailsData = angular.copy(getInitialPaymentDetailsData());

        // ---
        // On submit, add payment method.
        // ---
        $scope.addPaymentMethod = function () {
            if ( $scope.addPaymentMethodForm.$valid && !$scope.isRequestPending ) {

                // Show the loading bar
                $scope.isRequestPending = true;

                // - Validate $scope.paymentData
                // - Make sure client is ready to use
                $scope
                    .client
                    .tokenizeCard({
                        number: $scope.paymentData.cardNumber,
                        expirationDate: $scope.paymentData.cardExpirationDate
                    }, function (err, nonce) {

                        if ( err ) {
                            flash.to($scope.alertIdentifierId).error = err;
                        }
                        else {
                            flash.to($scope.alertIdentifierId).error = '';

                            // ---
                            // Update details with the received nonce.
                            // ---
                            var paymentDetailsData = angular.copy($scope.paymentDetailsData);
                            paymentDetailsData.paymentNonceDetailsDTO.paymentMethodNonce = nonce;

                            return $http
                                .post(URLTo.api(AUTH_URLS.createCustomerWithPaymentMethod), paymentDetailsData)
                                .then(function () {

                                    // ---
                                    // Reset the payment data with empty new data.
                                    // ---
                                    $scope.paymentData = angular.copy(getInitialPaymentData());

                                    $scope.addPaymentMethodForm.$setPristine();
                                    flash.to($scope.alertIdentifierId).success = 'We\'ve successfully saved your payment method!';

                                    $timeout(function () {
                                        $scope.isRequestPending = false;

                                        // ---
                                        // If successful, go to insights.
                                        // ---
                                        $state.go("settings.payment.insights");
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
                                        flash.to($scope.alertIdentifierId).error = 'We\'ve encountered an error while trying to save your payment method.';
                                    }
                                });
                        }
                    });
            }

        };

    });