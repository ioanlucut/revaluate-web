angular
    .module("revaluate.settings")
    .controller("SettingsPaymentMethodController", function ($q, $scope, $rootScope, $timeout, $http, AUTH_URLS, $braintree, clientToken, paymentInsights, flash, ALERTS_CONSTANTS, MIXPANEL_EVENTS) {

        var TIMEOUT_PENDING = 300;

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.paymentProfile;

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
        $scope.paymentInsights = paymentInsights;

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
        $scope.paymentDetailsData = angular.copy(getInitialPaymentDetailsData());

        // ---
        // UPDATE PAYMENT METHOD RELATED
        // ---
        $scope.updatePaymentMethod = function () {
            if ( $scope.updatePaymentMethodForm.$valid && !$scope.isRequestPending ) {

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
                            paymentDetailsData.paymentMethodNonce = nonce;

                            return $http
                                .put(URLTo.api(AUTH_URLS.updatePaymentMethod), paymentDetailsData)
                                .then(function () {

                                    // ---
                                    // Reset the payment data with empty new data.
                                    // ---
                                    $scope.paymentData = angular.copy(getInitialPaymentData());

                                    $scope.updatePaymentMethodForm.$setPristine();

                                    $timeout(function () {
                                        $scope.isRequestPending = false;
                                        flash.to($scope.alertIdentifierId).success = 'We\'ve successfully updated your payment method!';
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
                                        flash.to($scope.alertIdentifierId).error = 'We\'ve encountered an error while trying to update your payment method.';
                                    }
                                });
                        }
                    });
            }

        };

    });