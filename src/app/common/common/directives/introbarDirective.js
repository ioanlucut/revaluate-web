function introbarDirective($timeout) {
  'ngInject';

  return {
    restrict: 'A',
    controller($scope,
               $rootScope,
               AuthService,
               AUTH_EVENTS) {
      'ngInject';

      /**
       * Reference to the current user.
       */
      this.currentUser = $rootScope.currentUser;

      /**
       * Is user authenticated ?
       */
      this.isUserAuthenticated = AuthService.isAuthenticated();

      $scope.$on(AUTH_EVENTS.loginSuccess, _.bind(function () {
        this.isUserAuthenticated = true;
      }, this));

      $scope.$on(AUTH_EVENTS.logoutSuccess, _.bind(function () {
        this.isUserAuthenticated = false;
      }, this));

    },

    controllerAs: 'vm',
    link(scope, elem, attrs, ctrl) {

      scope.$on('$viewContentLoaded', () => {
        const ID_SELECTOR = '#ib-content', el = $(ID_SELECTOR);

        if (ctrl.isUserAuthenticated && el.is(':visible')) {
          $timeout(() => {
            el.hide();
          });
        }
      });

    },
  };
}

export default introbarDirective;
