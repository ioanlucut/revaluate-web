function SignUpController($rootScope,
                          $scope,
                          $timeout,
                          ALERTS_EVENTS,
                          ALERTS_CONSTANTS,
                          StatesHandler,
                          User,
                          AuthService,
                          USER_ACTIVITY_EVENTS,
                          APP_CONFIG) {
  'ngInject';

  /**
   * Alert identifier
   */
  $scope.alertId = ALERTS_CONSTANTS.signUpConfirm;

  /**
   * Sign up user information.
   */
  $scope.signUpData = {
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    currency: {
      currencyCode: 'EUR',
    },
  };

  /**
   * Trial days
   */
  $scope.trialDays = APP_CONFIG.TRIAL_DAYS;

  /*
   * Sign up functionality.
   * @param signUpData
   */
  $scope.signUp = signUpData => {
    if ($scope.signUpForm.$valid && !$scope.isRequestPending) {

      $scope.isRequestPending = true;

      User.$new()
        .create(signUpData)
        .then(() => {
          $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.signUpCompleted);

          AuthService
            .login(signUpData.email, signUpData.password)
            .then(() => {
              $scope.isRequestPending = false;

              StatesHandler.goToSetUp();
            });
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

export default SignUpController;
