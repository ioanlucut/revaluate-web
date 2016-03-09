/**
 * Update password controller.
 */
function SettingsAdminUpdatePasswordController($scope, ALERTS_EVENTS, $timeout, AuthService, ACCOUNT_FORM_STATE, ALERTS_CONSTANTS) {

  var _this = this;

  var TIMEOUT_PENDING = 300;

  /**
   * Alert identifier
   */
  _this.alertId = ALERTS_CONSTANTS.updatePassword;

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
  _this.updatePasswordData = angular.copy(initialUpdatePasswordData);

  /**
   * Update password data functionality.
   */
  _this.updatePassword = function () {
    if (!(_this.updatePasswordForm.$valid && !_this.isRequestPending)) {
      return;
    }

    if (_this.updatePasswordData.newPassword !== _this.updatePasswordData.newPasswordConfirmation) {
      $scope.$emit(ALERTS_EVENTS.DANGER, {
        message: 'Your new password should match the new confirmation password.',
        alertId: _this.alertId,
      });

      return;
    }

    _this.isRequestPending = true;

    AuthService
      .updatePassword(_this.updatePasswordData.oldPassword, _this.updatePasswordData.newPassword, _this.updatePasswordData.newPasswordConfirmation)
      .then(function () {

        $timeout(function () {
          _this.isRequestPending = false;
          $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Updated');
        }, TIMEOUT_PENDING);
      })
      .catch(function () {
        /* If bad feedback from server */
        _this.badPostSubmitResponse = true;
        _this.isRequestPending = false;

        $scope.$emit(ALERTS_EVENTS.DANGER, {
          message: 'Error. Please try again.',
          alertId: _this.alertId,
        });
      })
      .finally(function () {
        _this.updatePasswordForm.$setPristine();
        _this.updatePasswordData = angular.copy(initialUpdatePasswordData);
      });
  };
}

export default SettingsAdminUpdatePasswordController;
