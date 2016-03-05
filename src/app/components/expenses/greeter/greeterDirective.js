export default

  angular
    .module('revaluate.expenses')
    .directive('greeter', function ($rootScope, $timeout) {
      return {
        restrict: 'E',
        scope: {
          greet: '=',
        },
        templateUrl: '/app/components/expenses/greeter/greeterDirective.tpl.html',
        link: function (scope, el) {
          var TIMEOUT = 1000;

          scope.user = $rootScope.currentUser;

          scope.$on('$viewContentLoaded', function () {
            if (!el.is(':visible')) {
              $timeout(function () {
                el.show();
              }, TIMEOUT);
            }
          });
        },
      };
    });

