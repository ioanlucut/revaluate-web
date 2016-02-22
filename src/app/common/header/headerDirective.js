(function () {
  'use strict';

  angular
    .module('revaluate.common')
    .directive('header', function () {
      return {
        restrict: 'A',
        templateUrl: '/app/common/header/headerDirective.tpl.html',
        controller: 'HeaderController',
        controllerAs: 'vm',
        link: function () {
        },
      };
    });
}());
