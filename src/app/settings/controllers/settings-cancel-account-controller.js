angular
    .module("revaluate.settings")
    .controller("SettingsCancelAccountController", function ($q, $rootScope, $timeout, StatesHandler, AuthService, flash, ALERTS_CONSTANTS) {

        /* jshint validthis: true */
        var vm = this;

        var TIMEOUT_PENDING = 1000;

        /**
         * Alert identifier
         */
        vm.alertIdentifierId = ALERTS_CONSTANTS.cancelAccount;

        /**
         * Cancel account functionality.
         */
        vm.cancelAccount = function () {

            if ( !vm.isDeleting ) {

                vm.isDeleting = true;

                AuthService
                    .cancelAccount()
                    .then(function () {

                        flash.to(vm.alertIdentifierId).success = 'We\'ve successfully deleted your account!';
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

                        flash.to(vm.alertIdentifierId).error = 'We\'ve encountered an error while trying to remove your account.';
                    });
            }
        };
    });