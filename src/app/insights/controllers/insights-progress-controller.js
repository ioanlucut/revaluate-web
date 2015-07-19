'use strict';

angular
    .module("revaluate.insights")
    .controller("InsightsProgressController", function (DatesUtils, $controller, $templateCache, $scope, $rootScope, $filter, $timeout, InsightsGenerator, ALERTS_EVENTS, INSIGHTS_INTERVAL, insightsProgress, monthsPerYearsStatistics, categories, InsightsService, USER_ACTIVITY_EVENTS, INSIGHTS_CHARTS, ALERTS_CONSTANTS) {

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

        /**
         * Prepares data for progress chart
         */
        function prepareDataForProgressChart() {
            var insightsPrepared = InsightsGenerator.generate(vm.insightsProgress, vm.masterCategories);
            vm.insightLineData = insightsPrepared.insightLineData;
            vm.insightLabels = insightsPrepared.insightLabels;
            vm.insightLineSeries = insightsPrepared.insightLineSeries;
            vm.insightLineColors = insightsPrepared.insightLineColors;

            vm.availableYearMonths = insightsPrepared.availableYearMonths;
            vm.totalAmountPerMonths = insightsPrepared.totalAmountPerMonths;
        }

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
         * Existing categories.
         */
        vm.categories = categories;

        /**
         * Just make a copy of master categories
         */
        vm.masterCategories = angular.copy(vm.categories);

        /**
         * Default insights progress.
         */
        vm.insightsProgress = insightsProgress;

        /**
         * Default active interval selected.
         * @type {number}
         */
        vm.activeInterval = vm.INSIGHTS_INTERVAL.QUARTER_YEAR;

        // ---
        // Computed information and methods.
        // ---
        prepareDataForProgressChart();

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
                .fetchProgressInsightsFromTo(period.from, period.to)
                .then(function (receivedInsight) {
                    vm.activeInterval = insightsIntervalMonths;

                    /**
                     * Track event.
                     */
                    $scope.$emit("trackEvent", USER_ACTIVITY_EVENTS.insightsProgressFetched);

                    $timeout(function () {
                        // ---
                        // Update everything.
                        // ---
                        vm.insightsProgress = receivedInsight;

                        // ---
                        // Computed information and methods.
                        // ---
                        prepareDataForProgressChart();

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
