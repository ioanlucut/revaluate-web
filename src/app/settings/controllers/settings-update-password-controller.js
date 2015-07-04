'use strict';

/**
 * Update password controller.
 */
angular
    .module("revaluate.settings")
    .controller("SettingsUpdatePasswordController", function ($scope, ALERTS_EVENTS, $timeout, AuthService, ACCOUNT_FORM_STATE, ALERTS_CONSTANTS) {

        /* jshint validthis: true */
        var vm = this;

        var TIMEOUT_PENDING = 300;

        /**
         * Alert identifier
         */
        vm.alertIdentifierId = ALERTS_CONSTANTS.updatePassword;

        /**
         * Initial update password data.
         */
        var initialUpdatePasswordData = {
            oldPassword: "",
            newPassword: "",
            newPasswordConfirmation: ""
        };

        /**
         * Update password user information.
         * @type {{oldPassword: string, newPassword: string, newPasswordConfirmation: string}}
         */
        vm.updatePasswordData = angular.copy(initialUpdatePasswordData);

        /**
         * Update password data functionality.
         */
        vm.updatePassword = function () {
            if ( !( vm.updatePasswordForm.$valid && !vm.isRequestPending ) ) {
                return;
            }

            if ( vm.updatePasswordData.newPassword !== vm.updatePasswordData.newPasswordConfirmation ) {
                $scope.$emit(ALERTS_EVENTS.DANGER, 'Your new password should match the new confirmation password!');

                return;
            }

            vm.isRequestPending = true;

            AuthService
                .updatePassword(vm.updatePasswordData.oldPassword, vm.updatePasswordData.newPassword, vm.updatePasswordData.newPasswordConfirmation)
                .then(function () {

                    $timeout(function () {
                        vm.isRequestPending = false;
                        $scope.$emit(ALERTS_EVENTS.SUCCESS, 'We\'ve successfully updated your account!');
                    }, TIMEOUT_PENDING);
                })
                .catch(function () {
                    /* If bad feedback from server */
                    vm.badPostSubmitResponse = true;
                    vm.isRequestPending = false;

                    $scope.$emit(ALERTS_EVENTS.DANGER, 'We\'re not able to update your account. Please try again.');
                })
                .finally(function () {
                    vm.updatePasswordForm.$setPristine();
                    vm.updatePasswordData = angular.copy(initialUpdatePasswordData);
                });
        };
    });
