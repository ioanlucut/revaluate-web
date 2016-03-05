export default

  angular
    .module('revaluate.common')
    .directive('headerSide', function () {
      return {
        restrict: 'AE',
        templateUrl: '/app/common/header/headerSideDirective.tpl.html',
        controller: 'HeaderController',
        controllerAs: 'vm',
        link: function () {
        },
      };
    });

