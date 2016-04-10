function ValidatePasswordResetTokenController($scope,
                                              $q,
                                              $timeout,
                                              ALERTS_EVENTS,
                                              AuthService,
                                              StatesHandler,
                                              ProfileFormToggle,
                                              ACCOUNT_FORM_STATE,
                                              validateTokenResult,
                                              ALERTS_CONSTANTS) {
  'ngInject';

  const TIMEOUT = 1500;

  /**
   * Alert identifier
   */
  _.assign($scope, {
    alertId: ALERTS_CONSTANTS.validatePassword,
  });

  /**
   * Reset password data (used if
   * @type {{email: string, password: string, passwordConfirmation: string, token: *}}
   */
  _.assign($scope, {
    resetPasswordData: {
      email: validateTokenResult.email,
      password: '',
      passwordConfirmation: '',
      token: validateTokenResult.token,
    },
  });

  /**
   * Reset password data functionality.
   * @param resetPasswordData
   */
  _.assign($scope, {
    resetPassword: resetPasswordData => {
      if (!$scope.resetPasswordForm.$valid) {
        return $q.when();
      }

      return AuthService
        .resetPasswordWithToken(
          resetPasswordData.email,
          resetPasswordData.password,
          resetPasswordData.passwordConfirmation,
          resetPasswordData.token)
        .then(() => {
          _.assign($scope, {
            successfullyReseted: true,
          });
          ProfileFormToggle.setState(ACCOUNT_FORM_STATE.resetPasswordSuccessfully);

          // Log in the user, and forward it to the expenses page.
          return AuthService
            .login(resetPasswordData.email, resetPasswordData.password)
            .then(() => {
              $timeout(() => {
                StatesHandler.goToExpenses();
              }, TIMEOUT);
            });
        })
        .catch(() => {
          /* If bad feedback from server */
          _.assign($scope, {
            badPostSubmitResponse: true,
          });

          $scope.$emit(ALERTS_EVENTS.DANGER, {
            message: 'Ups, something went wrong.',
            alertId: $scope.alertId,
          });
        });
    },
  });
}

export default ValidatePasswordResetTokenController;
