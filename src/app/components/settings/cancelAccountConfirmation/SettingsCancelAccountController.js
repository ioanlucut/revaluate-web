function SettingsCancelAccountController($scope,
                                         $rootScope,
                                         $timeout,
                                         USER_ACTIVITY_EVENTS,
                                         StatesHandler,
                                         AuthService,
                                         ALERTS_EVENTS,
                                         ALERTS_CONSTANTS) {
  'ngInject';

  const _this = this, TIMEOUT_PENDING = 1000;

  /**
   * Alert identifier
   */
  _this.alertId = ALERTS_CONSTANTS.cancelAccount;

  /**
   * Cancel account functionality.
   */
  _this.cancelAccount = () => {

    if (_this.isDeleting) {
      return;
    }

    _this.isDeleting = true;

    AuthService
      .cancelAccount()
      .then(() => {

        // ---
        // Mark this user as canceled in intercom.
        // ---
        $scope.$emit('updateUserStats', {
          user: $rootScope.currentUser,
          args: {
            canceled: true,
          },
        });
        $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.accountCanceled);

        $scope.$emit(ALERTS_EVENTS.SUCCESS, 'We\'ve successfully deleted your account!');
        _this.isDeleting = false;

        $timeout(() => {

          // ---
          // We need to set the data and refresh the user.
          // ---
          AuthService
            .logout();
          StatesHandler
            .goHome();
        }, TIMEOUT_PENDING);

      })
      .catch(() => {
        /* If bad feedback from server */
        _this.badPostSubmitResponse = true;
        _this.isDeleting = false;

        $scope.$emit(ALERTS_EVENTS.DANGER, {
          message: 'Ups, something went wrong.',
          alertId: _this.alertId,
        });
      });
  };
}

export default SettingsCancelAccountController;
