function SettingsPaymentInsightsController($q,
                                           $scope,
                                           $state,
                                           $rootScope,
                                           $timeout,
                                           $http,
                                           paymentInsights,
                                           ALERTS_EVENTS,
                                           AUTH_URLS,
                                           ALERTS_CONSTANTS,
                                           USER_ACTIVITY_EVENTS,
                                           AUTH_EVENTS) {
  'ngInject';

  const _this = this;

  const TIMEOUT_PENDING = 300;

  /**
   * Alert identifier
   */
  _this.alertId = ALERTS_CONSTANTS.paymentProfile;

  /**
   * Current user.
   */
  _this.user = $rootScope.currentUser;

  // ---
  // Payment insights got from server.
  // ---
  _this.paymentInsights = paymentInsights;

  // ---
  // Is payment method defined ?.
  // ---
  _this.isPaymentMethodDefined = _this.paymentInsights.paymentMethodDTOs && _this.paymentInsights.paymentMethodDTOs.length > 0;

  // ---
  // Remove payment method.
  // ---
  _this.performRemovePayment = () => {
    if (!_this.isRequestPending) {

      // Show the loading bar
      _this.isRequestPending = true;

      return $http
        .delete(URLTo.api(AUTH_URLS.removePaymentMethod), {})
        .then(response => {

          // ---
          // Update user with subscription status.
          // ---
          _this
            .user
            .setSubscriptionStatusAsAndReload(response.data.userSubscriptionStatus);
          $rootScope
            .$broadcast(AUTH_EVENTS.refreshUser, {});

          $scope.$emit(ALERTS_EVENTS.SUCCESS, 'You\'ve successfully removed payment method!');
          $timeout(() => {
            _this.isRequestPending = false;

            // ---
            // If successful, go to expenses.
            // ---
            $state.go('expenses.regular');
          }, TIMEOUT_PENDING);
        })
        .catch(response => {
          /* If bad feedback from server */
          _this.badPostSubmitResponse = true;
          _this.isRequestPending = false;

          // ---
          // Show errors.
          // ---
          const errors = response.data;
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

  };

}

export default SettingsPaymentInsightsController;
