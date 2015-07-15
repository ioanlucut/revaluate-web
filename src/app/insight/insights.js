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
                templateUrl: "/app/insight/partials/insight.abstract.html",
                abstract: true
            })

            // ---
            // Monthly page.
            // ---
            .state({
                name: "insights.monthly",
                url: "/monthly",
                templateUrl: "/app/insight/partials/insight.monthly.html",
                controller: "InsightController",
                controllerAs: 'vm',
                resolve: {
                    insight: function (InsightService) {
                        var from = moment().startOf('month');
                        var to = moment().endOf('month');

                        return InsightService
                            .fetchMonthlyInsightsFromTo(from, to);
                    },
                    insightsMonthsPerYearsStatistics: function (StatisticService) {
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
                templateUrl: "/app/insight/partials/insight.overview.html",
                controller: "InsightOverviewController",
                controllerAs: 'vm',
                resolve: {
                    insightsOverview: function (InsightService) {
                        var from = moment().startOf('month').subtract(3, 'months');
                        var to = moment().endOf('month');

                        return InsightService
                            .fetchOverviewInsightsFromTo(from, to);
                    },
                    insightsMonthsPerYearsStatistics: function (StatisticService) {
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
                templateUrl: "/app/insight/partials/insight.progress.html",
                title: "Insights progress - Revaluate",
                stateEventName: USER_ACTIVITY_EVENTS.insightsPage
            });

    });
