function ValidatePasswordResetTokenInvalidController($scope, AuthService, StatesHandler, ProfileFormToggle, ACCOUNT_FORM_STATE) {
  'ngInject';

  /**
   * Flag which tells if user is currently authenticated while coming to this page.
   */
  $scope.isUserAuthenticated = AuthService.isAuthenticated();

  /**
   * Continues to reset password page. (try again functionality)
   */
  $scope.continueToResetPassword = () => {
    if ($scope.isUserAuthenticated) {
      AuthService.logout();
    }

    ProfileFormToggle.setState(ACCOUNT_FORM_STATE.forgotPassword);
    StatesHandler.goToLogin();
  };
}

export default ValidatePasswordResetTokenInvalidController;
