/**
 * Profile controller responsible for user update profile action.
 */
angular
    .module("revaluate.settings")
    .controller("SettingsProfileController", function ($q, $rootScope, $timeout, StatesHandler, SessionService, AUTH_EVENTS, flash, ALERTS_CONSTANTS, MIXPANEL_EVENTS) {

        /* jshint validthis: true */
        var vm = this;

        var TIMEOUT_PENDING = 300;

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.settingsProfile);

        /**
         * Alert identifier
         */
        vm.alertIdentifierId = ALERTS_CONSTANTS.updateProfile;

        /**
         * Current user.
         */
        vm.user = $rootScope.currentUser;

        /**
         * Initial profile data
         */
        function getInitialProfileData() {
            return {
                firstName: vm.user.model.firstName,
                lastName: vm.user.model.lastName,
                initiated: vm.user.model.initiated,
                currency: vm.user.model.currency
            };
        }

        /**
         * Profile user information.
         */
        vm.profileData = angular.copy(getInitialProfileData());

        /**
         * Update profile functionality.
         */
        vm.updateProfile = function () {

            if ( vm.profileForm.$valid && !vm.isRequestPending ) {

                // Show the loading bar
                vm.isRequestPending = true;

                // Update the user
                vm.user
                    .save(vm.profileData)
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

                        vm.profileForm.$setPristine();

                        $timeout(function () {
                            vm.isRequestPending = false;
                            flash.to(vm.alertIdentifierId).success = 'We\'ve successfully updated your account!';
                        }, TIMEOUT_PENDING);
                    })
                    .catch(function () {
                        /* If bad feedback from server */
                        vm.badPostSubmitResponse = true;
                        vm.isRequestPending = false;

                        flash.to(vm.alertIdentifierId).error = 'We\'ve encountered an error while trying to update your account.';
                    });
            }
        };

    });