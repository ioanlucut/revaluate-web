/**
 * Update password controller.
 */
function SettingsAdminUpdatePasswordController($scope,
                                               ALERTS_EVENTS,
                                               $timeout,
                                               AuthService,
                                               ALERTS_CONSTANTS) {
  'ngInject';

  const _this = this;

  const TIMEOUT_PENDING = 300;

  /**
   * Alert identifier
   */
  _this.alertId = ALERTS_CONSTANTS.updatePassword;

  /**
   * Initial update password data.
   */
  const initialUpdatePasswordData = {
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
  _this.updatePassword = () => {
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
      .then(() => {

        $timeout(() => {
          _this.isRequestPending = false;
          $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Updated');
        }, TIMEOUT_PENDING);
      })
      .catch(() => {
        /* If bad feedback from server */
        _this.badPostSubmitResponse = true;
        _this.isRequestPending = false;

        $scope.$emit(ALERTS_EVENTS.DANGER, {
          message: 'Error. Please try again.',
          alertId: _this.alertId,
        });
      })
      .finally(() => {
        _this.updatePasswordForm.$setPristine();
        _this.updatePasswordData = angular.copy(initialUpdatePasswordData);
      });
  };
}

export default SettingsAdminUpdatePasswordController;
