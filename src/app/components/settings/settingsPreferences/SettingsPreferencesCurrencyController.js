export default

/**
 * Preferences controller responsible for user update preferences action.
 */
  function ($q, $scope, $rootScope, $timeout, StatesHandler, SessionService, AUTH_EVENTS, ALERTS_EVENTS, ALERTS_CONSTANTS, APP_CONFIG) {

    var _this = this;

    /**
     * Saving timeout
     */
    var TIMEOUT_PENDING = 300;

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
    _this.currency.selected = _.find(_this.currencies, function (currencyCandidate) {
    return currencyCandidate.currencyCode === _this.user.model.currency.currencyCode;
  });

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
    _this.updatePreferences = function () {
    if (_this.preferencesForm.$valid && !_this.isSaving) {

      // Show the loading bar
      _this.isSaving = true;

      _this.profileData.currency = angular.copy(_this.currency.selected || _this.currency);

      // Update the user
      _this.user
        .updateCurrency(_this.profileData)
        .then(function (response) {
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

          $timeout(function () {
            _this.isSaving = false;
            $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Updated');
          }, TIMEOUT_PENDING);

        })
        .catch(function () {
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

