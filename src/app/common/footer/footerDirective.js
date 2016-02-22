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
        templateUrl: '/app/common/footer/footerDirective.tpl.html',
        link: function () {
        },
      };
    });
}());
