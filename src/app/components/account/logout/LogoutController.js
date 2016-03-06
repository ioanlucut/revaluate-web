/**
 * Logout controller responsible for user logout action.
 */
function LogoutController($scope, $timeout, StatesHandler, AuthService) {

  const vm = this;

  vm.logOut = () => {
    $timeout(() => {
      AuthService.logout();
      StatesHandler.goHome();
    });
  };

}

export default LogoutController;
