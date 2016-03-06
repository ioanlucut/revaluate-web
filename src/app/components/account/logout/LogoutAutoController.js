/**
 * Logout controller responsible for user logout action.
 */
function LogoutAutoController($scope, $timeout, $controller) {

  const TIMEOUT = 1500, vm = $controller('LogoutController', { $scope });

  $timeout(() => {
    vm.logOut();
  }, TIMEOUT);
}

export default LogoutAutoController;
