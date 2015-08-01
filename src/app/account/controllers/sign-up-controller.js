(function () {
    "use strict";

    angular
        .module("revaluate.account")
        .controller("SignUpController", function ($rootScope, $scope, $timeout, ALERTS_EVENTS, ALERTS_CONSTANTS, StatesHandler, User, AuthService, USER_ACTIVITY_EVENTS, APP_CONFIG) {

            /**
             * Alert identifier
             */
            $scope.alertId = ALERTS_CONSTANTS.signUpConfirm;

            /**
             * Sign up user information.
             */
            $scope.signUpData = {
                firstName: "",
                lastName: "",
                password: "",
                email: "",
                currency: {
                    "currencyCode": "EUR"
                }
            };

            /**
             * Trial days
             */
            $scope.trialDays = APP_CONFIG.TRIAL_DAYS;

            /*
             * Sign up functionality.
             * @param signUpData
             */
            $scope.signUp = function (signUpData) {
                if ( $scope.signUpForm.$valid && !$scope.isRequestPending ) {

                    $scope.isRequestPending = true;

                    User.$new()
                        .create(signUpData)
                        .then(function () {
                            $scope.$emit("trackEvent", USER_ACTIVITY_EVENTS.signUpCompleted);

                            AuthService
                                .login(signUpData.email, signUpData.password)
                                .then(function () {
                                    $scope.isRequestPending = false;

                                    StatesHandler.goToSetUp();
                                });
                        })
                        .catch(function () {
                            /* If bad feedback from server */
                            $scope.badPostSubmitResponse = true;
                            $scope.isRequestPending = false;

                            $scope.$emit(ALERTS_EVENTS.DANGER, {
                                message: "Sorry, something went wrong.",
                                alertId: $scope.alertId
                            });
                        });
                }
            };

        });
}());
