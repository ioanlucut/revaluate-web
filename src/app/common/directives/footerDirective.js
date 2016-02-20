(function () {
  'use strict';

  /**
   * Header directive responsible for header common template.
   */
  angular
    .module('revaluate.common')
    .directive('footer', function () {
      return {
        restrict: 'A',
        templateUrl: '/app/common/partials/footerDirective.tpl.html',
        link: function () {
        },
      };
    });
}());
