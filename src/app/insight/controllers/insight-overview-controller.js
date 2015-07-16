'use strict';

angular
    .module("revaluate.insights")
    .controller("InsightOverviewController", function ($controller, $templateCache, $scope, $rootScope, $filter, $timeout, ALERTS_EVENTS, INSIGHTS_INTERVAL, insightsOverview, monthsPerYearsStatistics, InsightService, USER_ACTIVITY_EVENTS, INSIGHTS_CHARTS, ALERTS_CONSTANTS) {

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

        // ---
        // Computed information and methods.
        // ---
        vm.insightLineData = [vm.insightsOverview.model.insightData];
        vm.insightLineSeries = [MONTHS];
        vm.activeInterval = vm.INSIGHTS_INTERVAL.QUARTER_YEAR;

        /**
         * Load insights
         */
        vm.loadInsights = function (insightsIntervalMonths) {
            if ( vm.isLoading ) {

                return;
            }
            vm.isLoading = true;
            var from = moment().startOf('month').subtract(insightsIntervalMonths - 1, "M");
            var to = moment().endOf('month');

            InsightService
                .fetchOverviewInsightsFromTo(from, to)
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
                        vm.insightLineData = [vm.insightsOverview.model.insightData];

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
