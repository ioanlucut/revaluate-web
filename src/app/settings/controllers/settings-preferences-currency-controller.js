(function () {
    'use strict';

    /**
     * Preferences controller responsible for user update preferences action.
     */
    angular
        .module('revaluate.settings')
        .controller('SettingsPreferencesCurrencyController', function ($q, $scope, $rootScope, $timeout, StatesHandler, SessionService, AUTH_EVENTS, ALERTS_EVENTS, ALERTS_CONSTANTS, APP_CONFIG) {

            /* jshint validthis: true */
            var vm = this;

            /**
             * Saving timeout
             */
            var TIMEOUT_PENDING = 300;

            /**
             * All given currencies.
             * @type {currencies|*}
             */
            vm.currencies = APP_CONFIG.CURRENCIES;

            /**
             * Alert identifier
             */
            vm.alertId = ALERTS_CONSTANTS.preferences;

            /**
             * Current user.
             * @type {$rootScope.currentUser|*}
             */
            vm.user = $rootScope.currentUser;

            /**
             * Selected currency
             * @type {{}}
             */
            vm.currency = {};
            vm.currency.selected = _.find(vm.currencies, function (currencyCandidate) {
                return currencyCandidate.currencyCode === vm.user.model.currency.currencyCode;
            });

            /**
             * Initial profile data
             */
            function getInitialProfileData() {
                return {
                    currency: vm.currency.selected
                };
            }

            /**
             * Profile user information.
             */
            vm.profileData = angular.copy(getInitialProfileData());

            /**
             * Update profile functionality.
             */
            vm.updatePreferences = function () {
                if (vm.preferencesForm.$valid && !vm.isSaving) {

                    // Show the loading bar
                    vm.isSaving = true;

                    vm.profileData.currency = angular.copy(vm.currency.selected || vm.currency);

                    // Update the user
                    vm.user
                        .updateCurrency(vm.profileData)
                        .then(function (response) {
                            // ---
                            // Reload data with given response.
                            // ---
                            vm.user
                                .loadFrom(response.data);

                            // ---
                            // We need to set the data and refresh the user.
                            // ---
                            SessionService.setData(response.data);
                            $rootScope.$broadcast(AUTH_EVENTS.refreshUser, response);

                            // ---
                            // Reset the profile data with possible new data.
                            // ---
                            vm.profileData = angular.copy(getInitialProfileData());

                            vm.preferencesForm.$setPristine();

                            $timeout(function () {
                                vm.isSaving = false;
                                $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Updated');
                            }, TIMEOUT_PENDING);

                        })
                        .catch(function () {
                            /* If bad feedback from server */
                            vm.badPostSubmitResponse = true;
                            vm.isSaving = false;

                            $scope.$emit(ALERTS_EVENTS.DANGER, {
                                message: 'We\'ve encountered an error.',
                                alertId: vm.alertId
                            });
                        });
                }
            };

        });
}());
