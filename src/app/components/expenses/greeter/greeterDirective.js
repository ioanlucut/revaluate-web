function greeterDirective($rootScope, $timeout) {
  'ngInject';

  return {
    restrict: 'E',
    scope: {
      greet: '=',
    },
    templateUrl: '/app/components/expenses/greeter/greeterDirective.tpl.html',
    link(scope, el) {
      const TIMEOUT = 1000;

      scope.user = $rootScope.currentUser;

      scope.$on('$viewContentLoaded', () => {
        if (!el.is(':visible')) {
          $timeout(() => {
            el.show();
          }, TIMEOUT);
        }
      });
    },
  };
}

export default greeterDirective;
