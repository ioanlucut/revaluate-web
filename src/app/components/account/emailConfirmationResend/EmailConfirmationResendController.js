export default

angular
  .controller('EmailConfirmationResendController', function ($scope, $rootScope, $timeout, ALERTS_EVENTS, AuthService, StatesHandler, ACCOUNT_FORM_STATE, ALERTS_CONSTANTS) {

    var TIMEOUT_PENDING = 300;

    /**
     * Alert identifier
     */
    $scope.alertId = ALERTS_CONSTANTS.validatePassword;

    /**
     * Current user.
     */
    $scope.user = $rootScope.currentUser;

    var sendConfirmationEmailData = {
      email: $scope.user.model.email,
    };

    $scope.sendConfirmationEmail = function (sendConfirmationEmailForm) {
      if ( sendConfirmationEmailForm.$valid && !$scope.isRequestPending ) {

        // Show the loading bar
        $scope.isRequestPending = true;

        AuthService
          .requestConfirmationEmail(sendConfirmationEmailData.email)
          .then(function () {
            $timeout(function () {
              $scope.isRequestPending = false;
              $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Sent');
            }, TIMEOUT_PENDING);
          })
          .catch(function () {
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

  });

