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

const logoutComponent = {
  bindings: {
    className: '@',
    title: '@',
  },
  controller: LogoutController,
  templateUrl: '/app/components/account/logout/logoutComponent.tpl.html',
};

export default logoutComponent;
