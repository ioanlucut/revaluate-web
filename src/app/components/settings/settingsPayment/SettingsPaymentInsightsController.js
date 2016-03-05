export default

function ($q, $scope, $state, $rootScope, $timeout, $http, paymentInsights, ALERTS_EVENTS, AUTH_URLS, ALERTS_CONSTANTS, USER_ACTIVITY_EVENTS, AUTH_EVENTS) {

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
  // Payment insights got from server.
  // ---
  vm.paymentInsights = paymentInsights;

  // ---
  // Is payment method defined ?.
  // ---
  vm.isPaymentMethodDefined = vm.paymentInsights.paymentMethodDTOs && vm.paymentInsights.paymentMethodDTOs.length > 0;

  // ---
  // Remove payment method.
  // ---
  vm.performRemovePayment = function () {
    if (!vm.isRequestPending) {

      // Show the loading bar
      vm.isRequestPending = true;

      return $http
        .delete(URLTo.api(AUTH_URLS.removePaymentMethod), {})
        .then(function (response) {

          // ---
          // Update user with subscription status.
          // ---
          vm
            .user
            .setSubscriptionStatusAsAndReload(response.data.userSubscriptionStatus);
          $rootScope
            .$broadcast(AUTH_EVENTS.refreshUser, {});

          $scope.$emit(ALERTS_EVENTS.SUCCESS, 'You\'ve successfully removed payment method!');
          $timeout(function () {
            vm.isRequestPending = false;

            // ---
            // If successful, go to expenses.
            // ---
            $state.go('expenses.regular');
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

  };

}

