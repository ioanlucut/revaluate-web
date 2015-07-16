'use strict';

angular
    .module("revaluate.insights", [
        "revaluate.common",
        "revaluate.expenses"
    ])
    .config(function ($stateProvider, USER_ACTIVITY_EVENTS) {

        $stateProvider

            // ---
            // Abstract state - insights.
            // ---
            .state({
                name: "insights",
                url: "/insights",
                templateUrl: "/app/insights/partials/insights.abstract.html",
                abstract: true
            })

            // ---
            // Monthly page.
            // ---
            .state({
                name: "insights.monthly",
                url: "/monthly",
                templateUrl: "/app/insights/partials/insights.monthly.html",
                controller: "InsightsMonthlyController",
                controllerAs: 'vm',
                resolve: {
                    insights: function (InsightsService) {
                        var from = moment().startOf('month');
                        var to = moment().endOf('month');

                        return InsightsService
                            .fetchMonthlyInsightsFromTo(from, to);
                    },
                    monthsPerYearsStatistics: function (StatisticService) {
                        return StatisticService
                            .fetchInsightsMonthsPerYearStatistics();
                    }
                },
                title: "Insights monthly - Revaluate",
                stateEventName: USER_ACTIVITY_EVENTS.insightsPage
            })

            // ---
            // Overview page.
            // ---
            .state({
                name: "insights.overview",
                url: "/overview",
                templateUrl: "/app/insights/partials/insights.overview.html",
                controller: "InsightsOverviewController",
                controllerAs: 'vm',
                resolve: {
                    insightsOverview: function (InsightsService, INSIGHTS_INTERVAL) {
                        var from = moment().startOf('month').subtract(INSIGHTS_INTERVAL.QUARTER_YEAR - 1, "M");
                        var to = moment().endOf('month');

                        return InsightsService
                            .fetchOverviewInsightsFromTo(from, to);
                    },
                    monthsPerYearsStatistics: function (StatisticService) {
                        return StatisticService
                            .fetchInsightsMonthsPerYearStatistics();
                    }
                },
                title: "Insights overview - Revaluate",
                stateEventName: USER_ACTIVITY_EVENTS.insightsPage
            })

            // ---
            // Progress page.
            // ---
            .state({
                name: "insights.progress",
                url: "/progress",
                templateUrl: "/app/insights/partials/insights.progress.html",
                title: "Insights progress - Revaluate",
                stateEventName: USER_ACTIVITY_EVENTS.insightsPage
            });

    });
