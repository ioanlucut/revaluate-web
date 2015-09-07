(function () {
    'use strict';

    /**
     * Login controller responsible for user login actions.
     */
    angular
        .module('revaluate.account')
        .controller('LoginController', function ($scope, ALERTS_EVENTS, ALERTS_CONSTANTS, AuthService, AUTH_EVENTS, ACCOUNT_FORM_STATE, AccountModal, StatesHandler, $timeout) {

            /**
             * Alert identifier
             */
            $scope.alertId = ALERTS_CONSTANTS.login;

            /**
             * If not opened, open it.
             */
            if (!AccountModal.isOpen) {
                AccountModal.openWithState(ACCOUNT_FORM_STATE.login);
            }

            /**
             * Login user information.
             */
            $scope.loginData = {
                email: '',
                password: ''
            };

            /**
             * Login functionality.
             */
            $scope.login = function (loginData) {
                if ($scope.loginForm.$valid && !$scope.isRequestPending) {

                    // Show the loading bar
                    $scope.isRequestPending = true;
                    $scope.isWaitingForCloseEvent = false;

                    AuthService
                        .login(loginData.email, loginData.password)
                        .then(function () {

                            $scope.isWaitingForCloseEvent = true;
                            StatesHandler.goToExpenses(function () {
                                $timeout(function () {
                                    $scope.isWaitingForCloseEvent = false;
                                }, 1000);
                            });
                        })
                        .catch(function () {
                            /* If bad feedback from server */
                            $scope.badPostSubmitResponse = true;

                            $scope.$emit(ALERTS_EVENTS.DANGER, {
                                message: 'Your email or password are wrong. Please try again.',
                                alertId: $scope.alertId
                            });
                        })
                        .finally(function () {
                            $scope.isRequestPending = false;
                        });
                }
            };
        });
}());
