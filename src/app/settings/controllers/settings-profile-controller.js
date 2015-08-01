(function () {
    "use strict";

    /**
     * Profile controller responsible for user update profile action.
     */
    angular
        .module("revaluate.settings")
        .controller("SettingsProfileController", function ($q, $scope, $rootScope, $timeout, StatesHandler, SessionService, AUTH_EVENTS, ALERTS_EVENTS, ALERTS_CONSTANTS, USER_ACTIVITY_EVENTS) {

            /* jshint validthis: true */
            var vm = this;

            var TIMEOUT_PENDING = 300;

            /**
             * Alert identifier
             */
            vm.alertId = ALERTS_CONSTANTS.updateProfile;

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
                    lastName: vm.user.model.lastName
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
                        .updateAccountDetails(vm.profileData)
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
                                $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Updated');
                            }, TIMEOUT_PENDING);
                        })
                        .catch(function () {
                            /* If bad feedback from server */
                            vm.badPostSubmitResponse = true;
                            vm.isRequestPending = false;

                            $scope.$emit(ALERTS_EVENTS.DANGER, {
                                message: "We\'ve encountered an error.",
                                alertId: vm.alertId
                            });
                        });
                }
            };

        });
}());
