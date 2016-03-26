/**
 * Logout controller responsible for user logout action.
 */
function LogoutAutoController($scope, $timeout, $controller) {
  'ngInject';

  const TIMEOUT = 1500, _this = $controller('LogoutController', { $scope });

  $timeout(() => {
    _this.logOut();
  }, TIMEOUT);
}

export default LogoutAutoController;
