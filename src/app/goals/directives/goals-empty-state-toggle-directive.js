(function () {
    'use strict';

    angular
        .module('revaluate.goals')
        .directive('goalsEmptyStateToggle', function () {
            return {
                restrict: 'EA',
                transclude: true,
                scope: {
                    showEmptyState: '='
                },
                templateUrl: '/app/goals/partials/goals-empty-state-toggle-directive.tpl.html',
                link: function () {
                }
            };
        });
}());
