function EmailConfirmationResendController($scope,
                                           $rootScope,
                                           $timeout,
                                           ALERTS_EVENTS,
                                           AuthService,
                                           ALERTS_CONSTANTS) {
  'ngInject';

  const TIMEOUT_PENDING = 300;

  /**
   * Alert identifier
   */
  $scope.alertId = ALERTS_CONSTANTS.validatePassword;

  /**
   * Current user.
   */
  $scope.user = $rootScope.currentUser;

  const sendConfirmationEmailData = {
    email: $scope.user.model.email,
  };

  $scope.sendConfirmationEmail = sendConfirmationEmailForm => {
    if (sendConfirmationEmailForm.$valid && !$scope.isRequestPending) {

      // Show the loading bar
      $scope.isRequestPending = true;

      AuthService
        .requestConfirmationEmail(sendConfirmationEmailData.email)
        .then(() => {
          $timeout(() => {
            $scope.isRequestPending = false;
            $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Sent');
          }, TIMEOUT_PENDING);
        })
        .catch(() => {
          /* If bad feedback from server */
          $scope.badPostSubmitResponse = true;
          $scope.isRequestPending = false;

          $scope.$emit(ALERTS_EVENTS.DANGER, {
            message: 'Ups, something went wrong.',
            alertId: $scope.alertId,
          });
        });
    }
  };

}

export default EmailConfirmationResendController;
