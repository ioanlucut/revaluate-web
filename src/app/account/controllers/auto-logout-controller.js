'use strict';

/**
 * Logout controller responsible for user logout action.
 */
export default angular
    .module('revaluate.account')
    .controller('AutoLogoutController', function ($scope, $timeout, $controller) {

        let TIMEOUT = 1500,
            vm = $controller('LogoutController', { $scope: $scope });

        $timeout(function () {
            vm.logOut();
        }, TIMEOUT);
    })
    .name;
