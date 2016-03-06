/**
 * Logout controller responsible for user logout action.
 */
function LogoutController($scope, $timeout, StatesHandler, AuthService) {

  var vm = this;

  vm.logOut = function () {
    $timeout(function () {
      AuthService.logout();
      StatesHandler.goHome();
    });
  };

}

export default LogoutController;
