/**
 * Forgot password controller responsible for user forgot password action.
 */
angular
    .module("account")
    .controller("ForgotPasswordCtrl", function ($state, $scope, flash, ALERTS_CONSTANTS, AuthService, AUTH_EVENTS, ACCOUNT_FORM_STATE, AccountModal) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.forgotPassword;

        /**
         * Request password reset up user information.
         */
        $scope.forgotPasswordData = {
            email: ""
        };

        /**
         * Request password reset functionality.
         */
        $scope.requestPasswordReset = function () {
            if ( $scope.forgotPasswordForm.$valid ) {
                AuthService
                    .requestPasswordReset($scope.forgotPasswordData.email)
                    .then(function () {
                        AccountModal.setState(ACCOUNT_FORM_STATE.forgotPasswordEmailSent);
                    })
                    .catch(function () {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;

                        flash.to($scope.alertIdentifierId).error = 'This email does not exist in our database.';
                    });
            }
        };
    });
