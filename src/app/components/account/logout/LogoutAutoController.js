/**
 * Logout controller responsible for user logout action.
 */
function LogoutAutoController($scope, $timeout, $controller) {

  var
    TIMEOUT = 1500,
    vm = $controller('LogoutController', { $scope: $scope });

  $timeout(function () {
    vm.logOut();
  }, TIMEOUT);
}

export default LogoutAutoController;
