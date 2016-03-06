export default

function ($q, $scope, $rootScope, $timeout, $http, AUTH_URLS, $braintree, clientToken, paymentInsights, ALERTS_EVENTS, ALERTS_CONSTANTS) {

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
  _this.paymentInsights = paymentInsights;

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
   * Initial Payment details data
   */
  function getInitialPaymentDetailsData() {
    return {
      paymentMethodNonce: '',
    };
  }

  /**
   * Payment details data.
   */
  _this.paymentDetailsData = angular.copy(getInitialPaymentDetailsData());

  // ---
  // UPDATE PAYMENT METHOD RELATED
  // ---
  _this.updatePaymentMethod = function () {
    if (_this.updatePaymentMethodForm.$valid && !_this.isRequestPending) {

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
            paymentDetailsData.paymentMethodNonce = nonce;

            return $http
              .put(URLTo.api(AUTH_URLS.updatePaymentMethod), paymentDetailsData)
              .then(function () {

                // ---
                // Reset the payment data with empty new data.
                // ---
                _this.paymentData = angular.copy(getInitialPaymentData());

                _this.updatePaymentMethodForm.$setPristine();

                $timeout(function () {
                  _this.isRequestPending = false;
                  $scope.$emit(ALERTS_EVENTS.SUCCESS, 'We\'ve successfully updated your payment method!');
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

