'use strict';

export default angular
    .module('revaluate.expenses')
    .directive('insightsEmptyStateToggle', function () {
        return {
            restrict: 'EA',
            transclude: true,
            scope: {
                showEmptyState: '='
            },
            templateUrl: '/app/insights/partials/insights-empty-state-toggle-directive.tpl.html',
            link: function () {
            }
        };
    })
    .name;
