'use strict';

angular
    .module("revaluate.insights")
    .controller("InsightOverviewController", function ($templateCache, $scope, $rootScope, $filter, $timeout, ALERTS_EVENTS, insightsOverview, insightsMonthsPerYearsStatistics, InsightService, USER_ACTIVITY_EVENTS, INSIGHTS_CHARTS, ALERTS_CONSTANTS) {

        /* jshint validthis: true */
        var vm = this;

        /**
         * Alert identifier
         */
        vm.alertId = ALERTS_CONSTANTS.insights;

        /**
         * Current user.
         * @type {$rootScope.currentUser|*}
         */
        vm.user = $rootScope.currentUser;

        /**
         * Default insights overview.
         */
        vm.insightsOverview = insightsOverview;

        /**
         * Insights months per years.
         */
        vm.insightsMonthsPerYearsStatistics = insightsMonthsPerYearsStatistics;

        // ---
        // Computed information and methods.
        // ---
        vm.insightLineData = [vm.insightsOverview.model.insightData];
        vm.insightLineSeries = ["Months"];

        // ---
        // Chart config options.
        // ---
        var defaultChartOptions = {
            scaleLabel: function (label) {

                return formatChartValue(label);
            },
            multiTooltipTemplate: function (label) {

                return label.datasetLabel + ' ' + formatChartValue(label);
            },
            tooltipTemplate: function (label) {

                return label.label + ' ' + formatChartValue(label);
            }
        };

        /**
         * Formats chart value
         */
        function formatChartValue(price) {

            return $filter('currency')(price.value.toString(), '', vm.user.model.currency.fractionSize) + ' ' + vm.user.model.currency.symbol
        }

        // ---
        // Specific bar chart options.
        // ---
        vm.barOptions = angular.extend({}, defaultChartOptions);
    });
