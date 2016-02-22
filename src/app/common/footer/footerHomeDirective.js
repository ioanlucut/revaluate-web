(function () {
  'use strict';

  /**
   * Header directive responsible for header common template.
   */
  angular
    .module('revaluate.common')
    .directive('footerHome', function () {
      return {
        restrict: 'A',
        templateUrl: '/app/common/footer/footerHomeDirective.tpl.html',
        link: function () {
        },
      };
    });
}());
