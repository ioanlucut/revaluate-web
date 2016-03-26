function ValidatePasswordResetTokenController($scope,
                                              $timeout,
                                              ALERTS_EVENTS,
                                              AuthService,
                                              StatesHandler,
                                              ProfileFormToggle,
                                              ACCOUNT_FORM_STATE,
                                              validateTokenResult,
                                              ALERTS_CONSTANTS) {
  'ngInject';

  /**
   * Alert identifier
   */
  $scope.alertId = ALERTS_CONSTANTS.validatePassword;

  /**
   * Reset password data (used if
   * @type {{email: string, password: string, passwordConfirmation: string, token: *}}
   */
  $scope.resetPasswordData = {
    email: validateTokenResult.email,
    password: '',
    passwordConfirmation: '',
    token: validateTokenResult.token,
  };

  /**
   * Reset password data functionality.
   * @param resetPasswordData
   */
  $scope.resetPassword = resetPasswordData => {
    if ($scope.resetPasswordForm.$valid) {

      AuthService
        .resetPasswordWithToken(resetPasswordData.email, resetPasswordData.password, resetPasswordData.passwordConfirmation, resetPasswordData.token)
        .then(() => {
          $scope.successfullyReseted = true;
          ProfileFormToggle.setState(ACCOUNT_FORM_STATE.resetPasswordSuccessfully);

          // Log in the user, and forward it to the expenses page.
          AuthService
            .login(resetPasswordData.email, resetPasswordData.password)
            .then(() => {
              $timeout(() => {
                StatesHandler.goToExpenses();
              }, 1500);
            });
        })
        .catch(() => {
          /* If bad feedback from server */
          $scope.badPostSubmitResponse = true;

          $scope.$emit(ALERTS_EVENTS.DANGER, {
            message: 'Ups, something went wrong.',
            alertId: $scope.alertId,
          });
        });
    }
  };

}

export default ValidatePasswordResetTokenController;
