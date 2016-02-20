(function () {
  'use strict';

  angular
    .module('revaluate.common')
    .directive('headerSide', function () {
      return {
        restrict: 'AE',
        templateUrl: '/app/common/partials/headerSideDirective.tpl.html',
        controller: 'HeaderController',
        controllerAs: 'vm',
        link: function () {
        },
      };
    });
}());
