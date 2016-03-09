function SettingsPaymentCustomerController($q, $scope, $rootScope, $timeout, $http, AUTH_URLS, paymentInsights, ALERTS_EVENTS, ALERTS_CONSTANTS) {

  var TIMEOUT_PENDING = 300;

  /**
   * Alert identifier
   */
  $scope.alertId = ALERTS_CONSTANTS.paymentProfile;

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
      email: $scope.paymentInsights.paymentCustomerDTO.email,
    };
  }

  /**
   * Payment details data.
   */
  $scope.paymentDetailsData = angular.copy(getInitialPaymentDetailsData());

  // ---
  // UPDATE CUSTOMER RELATED
  // ---
  $scope.updateCustomer = function () {
    if ($scope.updateCustomerForm.$valid && !$scope.isRequestPending) {

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
            $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Updated');
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
          if (_.isArray(errors)) {
            $scope.$emit(ALERTS_EVENTS.DANGER, {
              message: errors.join('\n'),
              alertId: $scope.alertId,
            });
          } else {
            $scope.$emit(ALERTS_EVENTS.DANGER, {
              message: 'Ups, something went wrong.',
              alertId: $scope.alertId,
            });
          }
        });
    }
  };

}

export default SettingsPaymentCustomerController;
