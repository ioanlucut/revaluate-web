export default

  function () {
      return {
        restrict: 'A',
        templateUrl: '/app/common/header/headerDirective.tpl.html',
        controller: 'HeaderController',
        controllerAs: 'vm',
        link: function () {
        },
      };
    }

