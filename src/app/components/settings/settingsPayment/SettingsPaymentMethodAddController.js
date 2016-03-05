export default

function ($q, $scope, $state, $rootScope, $timeout, $http, AUTH_URLS, $braintree, clientToken, paymentStatus, ALERTS_EVENTS, ALERTS_CONSTANTS, USER_ACTIVITY_EVENTS, AUTH_EVENTS, USER_SUBSCRIPTION_STATUS) {

  var vm = this;

  var TIMEOUT_PENDING = 300;

  /**
   * Alert identifier
   */
  vm.alertId = ALERTS_CONSTANTS.paymentProfile;

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
  vm.paymentStatus = paymentStatus;

  // ---
  // Braintree client.
  // ---
  vm.client = new $braintree.api.Client({
    clientToken: clientToken,
  });

  /**
   * Initial payment data
   */
  function getInitialPaymentData() {
    return {
      cardNumber: '',
      cardExpirationDate: '',
    };
  }

  /**
   * Profile user information.
   */
  vm.paymentData = angular.copy(getInitialPaymentData());

  /**
   * Initial payment details data
   */
  function getInitialPaymentDetailsData() {
    return {
      paymentCustomerDetailsDTO: {
        firstName: vm.user.model.firstName,
        lastName: vm.user.model.lastName,
        email: vm.user.model.email,
      },
      paymentNonceDetailsDTO: {
        paymentMethodNonce: '',
      },
    };
  }

  /**
   * Payment details data.
   */
  vm.paymentDetailsData = angular.copy(getInitialPaymentDetailsData());

  // ---
  // On submit, add payment method.
  // ---
  vm.addPaymentMethod = function () {
    if (vm.addPaymentMethodForm.$valid && !vm.isRequestPending) {

      // Show the loading bar
      vm.isRequestPending = true;

      // - Validate vm.paymentData
      // - Make sure client is ready to use
      vm
        .client
        .tokenizeCard({
          number: vm.paymentData.cardNumber,
          expirationDate: vm.paymentData.cardExpirationDate,
        }, function (err, nonce) {

          if (err) {
            $scope.$emit(ALERTS_EVENTS.DANGER, {
              message: err,
              alertId: vm.alertId,
            });
          } else {
            // ---
            // Update details with the received nonce.
            // ---
            var paymentDetailsData = angular.copy(vm.paymentDetailsData);
            paymentDetailsData.paymentNonceDetailsDTO.paymentMethodNonce = nonce;

            return $http
              .post(URLTo.api(AUTH_URLS.createCustomerWithPaymentMethodSubscribeToStandardPlan), paymentDetailsData)
              .then(function (response) {
                // ---
                // Update user with subscription status ACTIVE if subscription is also activated.
                // ---
                var paymentInsights = response.data;
                if (paymentInsights.subscriptionActive) {
                  vm
                    .user
                    .setSubscriptionStatusAsAndReload(USER_SUBSCRIPTION_STATUS.ACTIVE);
                  $rootScope
                    .$broadcast(AUTH_EVENTS.refreshUser, {});
                }

                // ---
                // Reset the payment data with empty new data.
                // ---
                vm.paymentData = angular.copy(getInitialPaymentData());

                vm.addPaymentMethodForm.$setPristine();

                $timeout(function () {
                  vm.isRequestPending = false;
                  $scope.$emit(ALERTS_EVENTS.SUCCESS, 'We\'ve successfully saved your payment method!');

                  // ---
                  // If successful, go to insights.
                  // ---
                  $state.go('settings.payment.insights');
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
                if (_.isArray(errors)) {
                  $scope.$emit(ALERTS_EVENTS.DANGER, {
                    message: errors.join('\n'),
                    alertId: vm.alertId,
                  });
                } else {
                  $scope.$emit(ALERTS_EVENTS.DANGER, {
                    message: 'Ups, something went wrong.',
                    alertId: vm.alertId,
                  });
                }
              });
          }
        });
    }

  };

}

