angular
    .module("revaluate.settings")
    .controller("SettingsPaymentController", function ($q, $scope, $rootScope, $timeout, $braintree, clientToken, flash, ALERTS_CONSTANTS, MIXPANEL_EVENTS) {

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
        // Braintree client.
        // ---
        $scope.client = new $braintree.api.Client({
            clientToken: clientToken
        });

        /**
         * Form data
         */
        $scope.creditCard = {
            number: '',
            expirationDate: ''
        };

        $scope.payButtonClicked = function () {

            // - Validate $scope.creditCard
            // - Make sure client is ready to use
            $scope
                .client
                .tokenizeCard({
                    number: $scope.creditCard.number,
                    expirationDate: $scope.creditCard.expirationDate
                }, function (err, nonce) {

                    console.log(err);
                    console.log(nonce);

                    // - Send nonce to your server (e.g. to make a transaction)

                });
        };

    });