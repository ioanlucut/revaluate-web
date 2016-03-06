export default

function ($q, $scope, $state, $rootScope, $timeout, $http, AUTH_URLS, $braintree, clientToken, paymentStatus, ALERTS_EVENTS, ALERTS_CONSTANTS, USER_ACTIVITY_EVENTS, AUTH_EVENTS, USER_SUBSCRIPTION_STATUS) {

  var _this = this;

  var TIMEOUT_PENDING = 300;

  /**
   * Alert identifier
   */
  _this.alertId = ALERTS_CONSTANTS.paymentProfile;

  /**
   * Current user.
   */
  _this.user = $rootScope.currentUser;

  // ---
  // Braintree client token got from server.
  // ---
  _this.clientToken = clientToken;

  // ---
  // Payment status.
  // ---
  _this.paymentStatus = paymentStatus;

  // ---
  // Braintree client.
  // ---
  _this.client = new $braintree.api.Client({
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
  _this.paymentData = angular.copy(getInitialPaymentData());

  /**
   * Initial payment details data
   */
  function getInitialPaymentDetailsData() {
    return {
      paymentCustomerDetailsDTO: {
        firstName: _this.user.model.firstName,
        lastName: _this.user.model.lastName,
        email: _this.user.model.email,
      },
      paymentNonceDetailsDTO: {
        paymentMethodNonce: '',
      },
    };
  }

  /**
   * Payment details data.
   */
  _this.paymentDetailsData = angular.copy(getInitialPaymentDetailsData());

  // ---
  // On submit, add payment method.
  // ---
  _this.addPaymentMethod = function () {
    if (_this.addPaymentMethodForm.$valid && !_this.isRequestPending) {

      // Show the loading bar
      _this.isRequestPending = true;

      // - Validate _this.paymentData
      // - Make sure client is ready to use
      _this
        .client
        .tokenizeCard({
          number: _this.paymentData.cardNumber,
          expirationDate: _this.paymentData.cardExpirationDate,
        }, function (err, nonce) {

          if (err) {
            $scope.$emit(ALERTS_EVENTS.DANGER, {
              message: err,
              alertId: _this.alertId,
            });
          } else {
            // ---
            // Update details with the received nonce.
            // ---
            var paymentDetailsData = angular.copy(_this.paymentDetailsData);
            paymentDetailsData.paymentNonceDetailsDTO.paymentMethodNonce = nonce;

            return $http
              .post(URLTo.api(AUTH_URLS.createCustomerWithPaymentMethodSubscribeToStandardPlan), paymentDetailsData)
              .then(function (response) {
                // ---
                // Update user with subscription status ACTIVE if subscription is also activated.
                // ---
                var paymentInsights = response.data;
                if (paymentInsights.subscriptionActive) {
                  _this
                    .user
                    .setSubscriptionStatusAsAndReload(USER_SUBSCRIPTION_STATUS.ACTIVE);
                  $rootScope
                    .$broadcast(AUTH_EVENTS.refreshUser, {});
                }

                // ---
                // Reset the payment data with empty new data.
                // ---
                _this.paymentData = angular.copy(getInitialPaymentData());

                _this.addPaymentMethodForm.$setPristine();

                $timeout(function () {
                  _this.isRequestPending = false;
                  $scope.$emit(ALERTS_EVENTS.SUCCESS, 'We\'ve successfully saved your payment method!');

                  // ---
                  // If successful, go to insights.
                  // ---
                  $state.go('settings.payment.insights');
                }, TIMEOUT_PENDING);
              })
              .catch(function (response) {
                /* If bad feedback from server */
                _this.badPostSubmitResponse = true;
                _this.isRequestPending = false;

                // ---
                // Show errors.
                // ---
                var errors = response.data;
                if (_.isArray(errors)) {
                  $scope.$emit(ALERTS_EVENTS.DANGER, {
                    message: errors.join('\n'),
                    alertId: _this.alertId,
                  });
                } else {
                  $scope.$emit(ALERTS_EVENTS.DANGER, {
                    message: 'Ups, something went wrong.',
                    alertId: _this.alertId,
                  });
                }
              });
          }
        });
    }

  };

}

