(function () {
    'use strict';

    angular
        .module('revaluate.settings')
        .controller('SettingsCancelAccountController', function ($q, $scope, $rootScope, $timeout, USER_ACTIVITY_EVENTS, StatesHandler, IntercomUtilsService, AuthService, ALERTS_EVENTS, ALERTS_CONSTANTS) {

            var vm = this;

            var TIMEOUT_PENDING = 1000;

            /**
             * Alert identifier
             */
            vm.alertId = ALERTS_CONSTANTS.cancelAccount;

            /**
             * Cancel account functionality.
             */
            vm.cancelAccount = function () {

                if ( vm.isDeleting ) {
                    return;
                }

                vm.isDeleting = true;

                AuthService
                    .cancelAccount()
                    .then(function () {

                        // ---
                        // Mark this user as canceled in intercom.
                        // ---
                        IntercomUtilsService.updateIntercom($rootScope.currentUser, { intercomAttributes: { canceled: true } });
                        $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.accountCanceled);

                        $scope.$emit(ALERTS_EVENTS.SUCCESS, 'We\'ve successfully deleted your account!');
                        vm.isDeleting = false;

                        $timeout(function () {

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
                        vm.badPostSubmitResponse = true;
                        vm.isDeleting = false;

                        $scope.$emit(ALERTS_EVENTS.DANGER, {
                            message: 'We\'ve encountered an error.',
                            alertId: vm.alertId
                        });
                    });
            };
        });
}());
