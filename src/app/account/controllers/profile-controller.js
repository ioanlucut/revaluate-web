/**
 * Profile controller responsible for user update profile action.
 */
angular
    .module("account")
    .controller("ProfileController", function ($q, $scope, $rootScope, $timeout, StatesHandler, ProfileFormToggle, AuthService, SessionService, AUTH_EVENTS, ACCOUNT_FORM_STATE, flash, ALERTS_CONSTANTS, MIXPANEL_EVENTS) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.updateProfile;

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.settings);

        /**
         * Set default state.
         */
        ProfileFormToggle.setState(ACCOUNT_FORM_STATE.updateProfile);

        /**
         * Current user.
         * @type {$rootScope.currentUser|*}
         */
        $scope.user = $rootScope.currentUser;

        var TIMEOUT_PENDING = 300;

        /**
         * Profile user information
         */
        $scope.profileData = {
            firstName: $scope.user.model.firstName,
            lastName: $scope.user.model.lastName,
            initiated: $scope.user.model.initiated,
            currency: $scope.user.model.currency
        };

        /**
         * Update profile functionality.
         */
        $scope.updateProfile = function (profileData) {

            if ( $scope.profileForm.$valid && !$scope.isRequestPending ) {

                // Show the loading bar
                $scope.isRequestPending = true;

                // Update the user
                $scope.user
                    .$save(profileData)
                    .then(function (response) {
                        // ---
                        // We need to set the data and refresh the user.
                        // ---
                        SessionService.setData(response.data);
                        $rootScope.$broadcast(AUTH_EVENTS.refreshUser, response);

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

        /**
         * Cancel account functionality.
         */
        $scope.cancelAccount = function () {

            if ( !$scope.isDeleting ) {

                $scope.isDeleting = true;

                AuthService
                    .cancelAccount()
                    .then(function () {
                        flash.to($scope.alertIdentifierId).success = 'We\'ve successfully deleted your account!';

                        $timeout(function () {
                            $scope.isDeleting = false;

                            // ---
                            // We need to set the data and refresh the user.
                            // ---
                            AuthService
                                .logout();
                            StatesHandler
                                .goHome();
                        }, TIMEOUT_PENDING);

                    })
                    .catch(function () {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;
                        $scope.isDeleting = false;

                        flash.to($scope.alertIdentifierId).error = 'We\'ve encountered an error while trying to remove your account.';
                    });
            }
        };

        $scope.getMeBack = function () {
            StatesHandler.goToExpenses();
        };
    });