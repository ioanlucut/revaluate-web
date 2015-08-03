(function () {
    'use strict';

    /**
     * Logout controller responsible for user logout action.
     */
    angular
        .module('revaluate.account')
        .controller('AutoLogoutController', function ($scope, $timeout, $controller) {

            var
                TIMEOUT = 1500,
                vm = $controller('LogoutController', { $scope: $scope });

            $timeout(function () {
                vm.logOut();
            }, TIMEOUT);
        });
}());
