'use strict';

angular
    .module("revaluate.expenses")
    .directive("insightsEmptyStateToggle", function () {
        return {
            restrict: "EA",
            transclude: true,
            scope: {
                showEmptyState: "="
            },
            templateUrl: "/app/insight/partials/insights.empty.state.toggle.tpl.html",
            link: function (scope, el, attrs) {
            }
        }
    });
