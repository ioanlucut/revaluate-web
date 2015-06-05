/**
 * Preferences controller responsible for user update preferences action.
 */
angular
    .module("revaluate.settings")
    .controller("SettingsPreferencesCurrencyController", function ($q, $scope, $rootScope, $timeout, StatesHandler, SessionService, AUTH_EVENTS, flash, currencies, ALERTS_CONSTANTS, MIXPANEL_EVENTS) {

        /**
         * Saving timeout
         */
        var TIMEOUT_PENDING = 300;

        /**
         * All given currencies.
         * @type {currencies|*}
         */
        $scope.currencies = currencies;

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.preferences;

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.settingsPreferences);

        /**
         * Current user.
         * @type {$rootScope.currentUser|*}
         */
        $scope.user = $rootScope.currentUser;

        /**
         * Selected currency
         * @type {{}}
         */
        /**
         * Selected category
         * @type {{}}
         */
        $scope.currency = {};
        $scope.currency.selected = _.find($scope.currencies, function (currencyCandidate) {
            return currencyCandidate.currencyCode === $scope.user.model.currency.currencyCode;
        });

        /**
         * Initial profile data
         */
        function getInitialProfileData() {
            return {
                currency: $scope.currency.selected
            };
        }

        /**
         * Profile user information.
         */
        $scope.profileData = angular.copy(getInitialProfileData());

        /**
         * Update profile functionality.
         */
        $scope.updatePreferences = function () {
            if ( $scope.preferencesForm.$valid && !$scope.isSaving ) {

                // Show the loading bar
                $scope.isSaving = true;

                $scope.profileData.currency = angular.copy($scope.currency.selected || $scope.currency);

                // Update the user
                $scope.user
                    .updateCurrency($scope.profileData)
                    .then(function (response) {
                        // ---
                        // Reload data with given response.
                        // ---
                        $scope.user
                            .loadFrom(response.data);

                        // ---
                        // We need to set the data and refresh the user.
                        // ---
                        SessionService.setData(response.data);
                        $rootScope.$broadcast(AUTH_EVENTS.refreshUser, response);

                        // ---
                        // Reset the profile data with possible new data.
                        // ---
                        $scope.profileData = angular.copy(getInitialProfileData());

                        $scope.preferencesForm.$setPristine();
                        flash.to($scope.alertIdentifierId).success = 'We\'ve successfully updated your preferences!';

                        $timeout(function () {
                            $scope.isSaving = false;
                        }, TIMEOUT_PENDING);

                    })
                    .catch(function () {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;
                        $scope.isSaving = false;

                        flash.to($scope.alertIdentifierId).error = 'We\'ve encountered an error while trying to update your preferences.';
                    });
            }
        };

    });