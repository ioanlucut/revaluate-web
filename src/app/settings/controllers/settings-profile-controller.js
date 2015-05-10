/**
 * Profile controller responsible for user update profile action.
 */
angular
    .module("revaluate.settings")
    .controller("SettingsProfileController", function ($q, $scope, $rootScope, $timeout, StatesHandler, SessionService, AUTH_EVENTS, flash, ALERTS_CONSTANTS, MIXPANEL_EVENTS) {

        var TIMEOUT_PENDING = 300;

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.updateProfile;

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.settingsProfile);

        /**
         * Current user.
         */
        $scope.user = $rootScope.currentUser;

        /**
         * Initial profile data
         */
        function getInitialProfileData() {
            return {
                firstName: $scope.user.model.firstName,
                lastName: $scope.user.model.lastName,
                initiated: $scope.user.model.initiated,
                currency: $scope.user.model.currency
            };
        }

        /**
         * Profile user information.
         */
        $scope.profileData = angular.copy(getInitialProfileData());

        /**
         * Update profile functionality.
         */
        $scope.updateProfile = function (profileData) {

            if ( $scope.profileForm.$valid && !$scope.isRequestPending ) {

                // Show the loading bar
                $scope.isRequestPending = true;

                // Update the user
                $scope.user
                    .save(profileData)
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

                        $scope.profileForm.$setPristine();
                        flash.to($scope.alertIdentifierId).success = 'We\'ve successfully updated your account!';

                        $timeout(function () {
                            $scope.isRequestPending = false;
                        }, TIMEOUT_PENDING);
                    })
                    .catch(function () {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;
                        $scope.isRequestPending = false;

                        flash.to($scope.alertIdentifierId).error = 'We\'ve encountered an error while trying to update your account.';
                    });
            }
        };

    });