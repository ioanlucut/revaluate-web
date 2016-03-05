export default

/**
 * Logout controller responsible for user logout action.
 */
angular
  .controller('LogoutAutoController', function ($scope, $timeout, $controller) {

    var
      TIMEOUT = 1500,
      vm = $controller('LogoutController', { $scope: $scope });

    $timeout(function () {
      vm.logOut();
    }, TIMEOUT);
  });

