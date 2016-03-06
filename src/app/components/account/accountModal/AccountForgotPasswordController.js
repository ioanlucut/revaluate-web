export default

/**
 * Forgot password controller responsible for user forgot password action.
 */
angular
  .controller('AccountForgotPasswordController', (
  $state,
  $scope,
  ALERTS_EVENTS,
  ALERTS_CONSTANTS,
  AuthService,
  AUTH_EVENTS,
  ACCOUNT_FORM_STATE,
  AccountModal) => {

    /**
     * Alert identifier
     */
    $scope.alertId = ALERTS_CONSTANTS.forgotPassword;

    /**
     * Request password reset up user information.
     */
    $scope.forgotPasswordData = {
      email: '',
    };

    /**
     * Request password reset functionality.
     */
    $scope.requestPasswordReset = () => {
      if ($scope.forgotPasswordForm.$valid) {
        AuthService
          .requestPasswordReset($scope.forgotPasswordData.email)
          .then(() => {
            AccountModal.setState(ACCOUNT_FORM_STATE.forgotPasswordEmailSent);
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
  });

