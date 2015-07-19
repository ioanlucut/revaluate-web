'use strict';

angular
    .module("revaluate.insights")
    .controller("InsightsOverviewController", function ($controller, $templateCache, $scope, $rootScope, $filter, $timeout, DatesUtils, ALERTS_EVENTS, INSIGHTS_INTERVAL, insightsOverview, monthsPerYearsStatistics, InsightsService, USER_ACTIVITY_EVENTS, INSIGHTS_CHARTS, ALERTS_CONSTANTS) {

        var TIMEOUT_DURATION = 150;
        var MONTHS = "Months";

        /* jshint validthis: true */
        var vm = this;

        /**
         * Alert identifier
         */
        vm.alertId = ALERTS_CONSTANTS.insights;

        /**
         * Insights interval
         */
        vm.INSIGHTS_INTERVAL = INSIGHTS_INTERVAL;

        // ---
        // Inherit from parent controller.
        // ---
        angular.extend(this, $controller('AbstractInsightsController', {
            $scope: $scope,
            $rootScope: $rootScope,
            $filter: $filter,
            monthsPerYearsStatistics: monthsPerYearsStatistics
        }));

        /**
         * Default insights overview.
         */
        vm.insightsOverview = insightsOverview;

        /**
         * Prepares data for chart
         */
        function prepareDataForChart() {
            vm.insightLineData = [vm.insightsOverview.model.insightData];

            // ---
            // Updates the bar width.
            // ---
            vm.updateBarWidthWith(vm.insightsOverview.model.insightData.length);
        }

        /**
         * Default interval
         */
        vm.activeInterval = vm.INSIGHTS_INTERVAL.QUARTER_YEAR;

        /**
         * Series (static)
         */
        vm.insightLineSeries = [MONTHS];

        // ---
        // Computed information and methods.
        // ---
        prepareDataForChart();

        /**
         * Load insights
         */
        vm.loadInsights = function (insightsIntervalMonths) {
            if ( vm.isLoading ) {

                return;
            }
            vm.isLoading = true;

            var period = DatesUtils
                .fromLastMonthsToNow(insightsIntervalMonths);
            InsightsService
                .fetchOverviewInsightsFromTo(period.from, period.to)
                .then(function (receivedInsight) {
                    vm.activeInterval = insightsIntervalMonths;

                    /**
                     * Track event.
                     */
                    $scope.$emit("trackEvent", USER_ACTIVITY_EVENTS.insightsOverviewFetched);

                    $timeout(function () {
                        // ---
                        // Update everything.
                        // ---
                        vm.insightsOverview = receivedInsight;

                        prepareDataForChart();
                        vm.isLoading = false;
                    }, TIMEOUT_DURATION);
                })
                .catch(function () {
                    vm.badPostSubmitResponse = true;
                    vm.isLoading = false;

                    $scope.$emit(ALERTS_EVENTS.DANGER, {
                        message: "Could not fetch insights.",
                        alertId: vm.alertId
                    });
                });
        }

    });
