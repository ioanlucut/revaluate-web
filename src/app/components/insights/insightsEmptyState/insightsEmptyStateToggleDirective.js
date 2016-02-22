(function () {
  'use strict';

  angular
    .module('revaluate.expenses')
    .directive('insightsEmptyStateToggle', function () {
      return {
        restrict: 'EA',
        transclude: true,
        scope: {
          showEmptyState: '=',
        },
        templateUrl: '/app/components/insights/insightsEmptyState/insightsEmptyStateToggleDirective.tpl.html',
        link: function () {
        },
      };
    });
}());
