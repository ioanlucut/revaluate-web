export default

/**
 * Update password controller.
 */
  function ($scope, ALERTS_EVENTS, $timeout, AuthService, ACCOUNT_FORM_STATE, ALERTS_CONSTANTS) {

    var vm = this;

    var TIMEOUT_PENDING = 300;

    /**
     * Alert identifier
     */
    vm.alertId = ALERTS_CONSTANTS.updatePassword;

    /**
     * Initial update password data.
     */
    var initialUpdatePasswordData = {
    oldPassword: '',
    newPassword: '',
    newPasswordConfirmation: '',
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
    if (!(vm.updatePasswordForm.$valid && !vm.isRequestPending)) {
      return;
    }

    if (vm.updatePasswordData.newPassword !== vm.updatePasswordData.newPasswordConfirmation) {
      $scope.$emit(ALERTS_EVENTS.DANGER, {
        message: 'Your new password should match the new confirmation password.',
        alertId: vm.alertId,
      });

      return;
    }

    vm.isRequestPending = true;

    AuthService
      .updatePassword(vm.updatePasswordData.oldPassword, vm.updatePasswordData.newPassword, vm.updatePasswordData.newPasswordConfirmation)
      .then(function () {

        $timeout(function () {
          vm.isRequestPending = false;
          $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Updated');
        }, TIMEOUT_PENDING);
      })
      .catch(function () {
        /* If bad feedback from server */
        vm.badPostSubmitResponse = true;
        vm.isRequestPending = false;

        $scope.$emit(ALERTS_EVENTS.DANGER, {
          message: 'Error. Please try again.',
          alertId: vm.alertId,
        });
      })
      .finally(function () {
        vm.updatePasswordForm.$setPristine();
        vm.updatePasswordData = angular.copy(initialUpdatePasswordData);
      });
  };
  }

