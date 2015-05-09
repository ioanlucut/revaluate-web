angular
    .module("revaluate.account")
    .controller("HomeSignUpRegistrationController", function ($scope, $timeout, flash, ALERTS_CONSTANTS, StatesHandler, User, AuthService, MIXPANEL_EVENTS) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.signUpConfirm;

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
                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.signUpCompleted);

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

                        flash.to($scope.alertIdentifierId).error = "Sorry, something went wrong.";
                    });
            }
        };

    });
