/**
 * Profile controller responsible for user update profile action.
 */
function SettingsProfileController($q,
                                   $scope,
                                   $rootScope,
                                   $timeout,
                                   StatesHandler,
                                   SessionService,
                                   AUTH_EVENTS,
                                   ALERTS_EVENTS,
                                   ALERTS_CONSTANTS) {

  const _this = this;

  /**
   * Alert identifier
   */
  _this.alertId = ALERTS_CONSTANTS.updateProfile;

  /**
   * Current user.
   */
  _this.user = $rootScope.currentUser;

  /**
   * Initial profile data
   */
  function getInitialProfileData() {
    return {
      firstName: _this.user.model.firstName,
      lastName: _this.user.model.lastName,
    };
  }

  /**
   * Profile user information.
   */
  _this.profileData = angular.copy(getInitialProfileData());

  /**
   * Update profile functionality.
   */
  _this.updateProfile = () => {

    if (_this.profileForm.$valid && !_this.isRequestPending) {

      // Show the loading bar
      _this.isRequestPending = true;

      // Update the user
      _this.user
        .updateAccountDetails(_this.profileData)
        .then(response => {
          // ---
          // Reload data with given response.
          // ---
          _this.user
            .loadFrom(response.data);

          // ---
          // We need to set the data and refresh the user.
          // ---
          SessionService.setData(response.data);
          $rootScope.$broadcast(AUTH_EVENTS.refreshUser, response);

          // ---
          // Reset the profile data with possible new data.
          // ---
          _this.profileData = angular.copy(getInitialProfileData());

          _this.profileForm.$setPristine();

          _this.isRequestPending = false;
          $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Updated');
        })
        .catch(() => {
          /* If bad feedback from server */
          _this.badPostSubmitResponse = true;
          _this.isRequestPending = false;

          $scope.$emit(ALERTS_EVENTS.DANGER, {
            message: 'Ups, something went wrong.',
            alertId: _this.alertId,
          });
        });
    }
  };

}

export default SettingsProfileController;
