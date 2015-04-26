/**
 * Login controller responsible for user login actions.
 */
angular
    .module("account")
    .controller("LoginController", function ($scope, flash, ALERTS_CONSTANTS, AuthService, AUTH_EVENTS, ACCOUNT_FORM_STATE, AccountModal, StatesHandler, $timeout) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.login;

        /**
         * If not opened, open it.
         */
        if ( !AccountModal.isOpen ) {
            AccountModal.openWithState(ACCOUNT_FORM_STATE.login)
        }

        var TIMEOUT_PENDING = 300;

        /**
         * Login user information.
         * @type {{username: string, password: string}}
         */
        $scope.loginData = {
            email: "",
            password: ""
        };

        /**
         * Login functionality.
         * @param loginData
         */
        $scope.login = function (loginData) {
            if ( $scope.loginForm.$valid ) {

                // Show the loading bar
                $scope.isRequestPending = true;

                AuthService
                    .login(loginData.email, loginData.password)
                    .then(function () {

                        StatesHandler.goToExpenses();
                    })
                    .catch(function () {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;

                        flash.to($scope.alertIdentifierId).error = "Your email or password are wrong. Please try again.";
                    }).finally(function () {
                        // Stop the loading bar
                        $timeout(function () {
                            $scope.isRequestPending = false;
                        }, TIMEOUT_PENDING);
                    })
            }
        };
    });
