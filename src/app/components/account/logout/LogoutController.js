/**
 * Logout controller responsible for user logout action.
 */
function LogoutController($scope, $timeout, StatesHandler, AuthService) {

  const _this = this;

  _this.logOut = () => {
    $timeout(() => {
      AuthService.logout();
      StatesHandler.goHome();
    });
  };

}

export default LogoutController;
