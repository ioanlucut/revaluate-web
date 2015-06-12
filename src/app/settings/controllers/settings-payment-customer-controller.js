angular
    .module("revaluate.settings")
    .controller("SettingsPaymentCustomerController", function ($q, $scope, $rootScope, $timeout, $http, AUTH_URLS, paymentInsights, flash, ALERTS_CONSTANTS, MIXPANEL_EVENTS) {

        var TIMEOUT_PENDING = 300;

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.paymentProfile;

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.settingsPaymentCustomer);

        /**
         * Current user.
         */
        $scope.user = $rootScope.currentUser;

        // ---
        // Payment status.
        // ---
        $scope.paymentInsights = paymentInsights;

        /**
         * Initial Payment details data
         */
        function getInitialPaymentDetailsData() {
            return {
                firstName: $scope.paymentInsights.paymentCustomerDTO.firstName,
                lastName: $scope.paymentInsights.paymentCustomerDTO.lastName,
                email: $scope.paymentInsights.paymentCustomerDTO.email
            }
        }

        /**
         * Payment details data.
         */
        $scope.paymentDetailsData = angular.copy(getInitialPaymentDetailsData());

        // ---
        // UPDATE CUSTOMER RELATED
        // ---
        $scope.updateCustomer = function () {
            if ( $scope.updateCustomerForm.$valid && !$scope.isRequestPending ) {

                // Show the loading bar
                $scope.isRequestPending = true;

                var paymentDetailsData = angular.copy($scope.paymentDetailsData);

                return $http
                    .put(URLTo.api(AUTH_URLS.updateCustomer), paymentDetailsData)
                    .then(function (response) {
                        $scope.paymentInsights = response.data;

                        // ---
                        // Reset the payment data with empty new data.
                        // ---
                        $scope.paymentDetailsData = angular.copy(getInitialPaymentDetailsData());

                        $scope.updateCustomerForm.$setPristine();

                        $timeout(function () {
                            $scope.isRequestPending = false;
                            flash.to($scope.alertIdentifierId).success = 'We\'ve successfully updated your customer information!';
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
                            flash.to($scope.alertIdentifierId).error = 'We\'ve encountered an error while trying to update your customer information.';
                        }
                    });
            }
        };

    });