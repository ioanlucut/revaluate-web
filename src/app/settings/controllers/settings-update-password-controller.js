/**
 * Update password controller.
 */
angular
    .module("settings")
    .controller("SettingsUpdatePasswordController", function ($scope, flash, $timeout, AuthService, ACCOUNT_FORM_STATE, ALERTS_CONSTANTS) {

        var TIMEOUT_PENDING = 300;

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.updatePassword;

        var initialUpdatePasswordData = {
            oldPassword: "",
            newPassword: "",
            newPasswordConfirmation: ""
        };

        /**
         * Update password user information.
         * @type {{oldPassword: string, newPassword: string, newPasswordConfirmation: string}}
         */
        $scope.updatePasswordData = angular.copy(initialUpdatePasswordData);

        /**
         * Update password data functionality.
         * @param updatePasswordData
         */
        $scope.updatePassword = function (updatePasswordData) {
            if ( !( $scope.updatePasswordForm.$valid && !$scope.isRequestPending ) ) {
                return;
            }

            if ( updatePasswordData.newPassword !== updatePasswordData.newPasswordConfirmation ) {
                flash.to($scope.alertIdentifierId).error = 'Your new password should match the new confirmation password!';

                return;
            }

            $scope.isRequestPending = true;

            AuthService
                .updatePassword(updatePasswordData.oldPassword, updatePasswordData.newPassword, updatePasswordData.newPasswordConfirmation)
                .then(function () {
                    flash.to($scope.alertIdentifierId).success = 'We\'ve successfully updated your account!';

                    $timeout(function () {
                        $scope.isRequestPending = false;
                    }, TIMEOUT_PENDING);
                })
                .catch(function () {
                    /* If bad feedback from server */
                    $scope.badPostSubmitResponse = true;
                    $scope.isRequestPending = false;

                    flash.to($scope.alertIdentifierId).error = 'We\'re not able to update your account. Please try again.';
                })
                .finally(function () {
                    $scope.updatePasswordForm.$setPristine();
                    $scope.updatePasswordData = angular.copy(initialUpdatePasswordData);
                });
        };
    });