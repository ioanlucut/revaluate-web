angular
    .module("settings")
    .controller("SettingsCancelAccountController", function ($q, $scope, $rootScope, $timeout, StatesHandler, AuthService, flash, ALERTS_CONSTANTS) {

        var TIMEOUT_PENDING = 1000;

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.cancelAccount;

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
    });