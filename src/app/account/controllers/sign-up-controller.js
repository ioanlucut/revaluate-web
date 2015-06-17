'use strict';

angular
    .module("revaluate.account")
    .controller("SignUpController", function ($scope, $timeout, flash, ALERTS_CONSTANTS, StatesHandler, User, AuthService, MIXPANEL_EVENTS, APP_CONFIG) {

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
