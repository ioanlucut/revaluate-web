/**
 * Logout controller responsible for user logout action.
 */
function LogoutController($timeout, StatesHandler, AuthService) {
  'ngInject';

  const _this = this;

  _this.logOut = () => {
    $timeout(() => {
      AuthService.logout();
      StatesHandler.goHome();
    });
  };

}

export default LogoutController;
