(function () {
    'use strict';

    function GoalDailyStatusController($rootScope, $filter, InsightsGenerator) {

        var vm = this;

        /**
         * Insights current year
         */
        vm.currentYear = moment().year();

        /**
         * Current user.
         */
        vm.user = $rootScope.currentUser;

        // ---
        // Computed information.
        // ---
        vm.barInsightsPrepared = InsightsGenerator
            .generateDailyBar(vm.currentYear, vm.insightsDaily);

        vm.barOptions = {
            scaleLabel: function (label) {
                return formatChartValue(label);
            },

            multiTooltipTemplate: function (label) {
                return label.datasetLabel + ' ' + formatChartValue(label);
            },

            tooltipTemplate: function (label) {
                return label.label + ' ' + formatChartValue(label);
            },

            scaleShowHorizontalLines: false,
            scaleShowVerticalLines: false,
            scaleShowLabels: false,
            showScale: false,
            scaleFontSize: 12,
            tooltipFontSize: 12,
            tooltipTitleFontSize: 12,
            tooltipYPadding: 10,
            tooltipXPadding: 10,
            barValueSpacing: 2
        };

        function formatChartValue(price) {
            return $filter('currency')(price.value.toString(), '', vm.user.model.currency.fractionSize) + ' ' + vm.user.model.currency.symbol;
        }

    }

    angular
        .module('revaluate.goals')
        .directive('goalDailyStatus', function () {
            return {
                restrict: 'E',
                scope: {
                    insightsDaily: '='
                },
                controller: GoalDailyStatusController,
                bindToController: true,
                controllerAs: 'vm',
                templateUrl: '/app/goals/partials/goal-daily-status-directive.tpl.html',
                link: function () {
                }
            };
        });
}());
