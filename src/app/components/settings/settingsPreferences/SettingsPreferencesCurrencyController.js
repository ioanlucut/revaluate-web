/**
 * Preferences controller responsible for user update preferences action.
 */
function SettingsPreferencesCurrencyController($scope,
                                               $rootScope,
                                               $timeout,
                                               SessionService,
                                               AUTH_EVENTS,
                                               ALERTS_EVENTS,
                                               ALERTS_CONSTANTS,
                                               APP_CONFIG) {
  'ngInject';

  const _this = this;

  /**
   * Saving timeout
   */
  const TIMEOUT_PENDING = 300;

  /**
   * All given currencies.
   * @type {currencies|*}
   */
  _this.currencies = APP_CONFIG.CURRENCIES;

  /**
   * Alert identifier
   */
  _this.alertId = ALERTS_CONSTANTS.preferences;

  /**
   * Current user.
   * @type {$rootScope.currentUser|*}
   */
  _this.user = $rootScope.currentUser;

  /**
   * Selected currency
   * @type {{}}
   */
  _this.currency = {};
  _this.currency.selected = _.find(_this.currencies, currencyCandidate => currencyCandidate.currencyCode === _this.user.model.currency.currencyCode);

  /**
   * Initial profile data
   */
  function getInitialProfileData() {
    return {
      currency: _this.currency.selected,
    };
  }

  /**
   * Profile user information.
   */
  _this.profileData = angular.copy(getInitialProfileData());

  /**
   * Update profile functionality.
   */
  _this.updatePreferences = () => {
    if (_this.preferencesForm.$valid && !_this.isSaving) {

      // Show the loading bar
      _this.isSaving = true;

      _this.profileData.currency = angular.copy(_this.currency.selected || _this.currency);

      // Update the user
      _this.user
        .updateCurrency(_this.profileData)
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

          _this.preferencesForm.$setPristine();

          $timeout(() => {
            _this.isSaving = false;
            $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Updated');
          }, TIMEOUT_PENDING);

        })
        .catch(() => {
          /* If bad feedback from server */
          _this.badPostSubmitResponse = true;
          _this.isSaving = false;

          $scope.$emit(ALERTS_EVENTS.DANGER, {
            message: 'Ups, something went wrong.',
            alertId: _this.alertId,
          });
        });
    }
  };

}

export default SettingsPreferencesCurrencyController;
