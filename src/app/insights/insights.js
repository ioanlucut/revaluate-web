'use strict';

angular
    .module("revaluate.insights", [
        "revaluate.common",
        "revaluate.categories",
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
                    insights: function (DatesUtils, InsightsService) {
                        var period = DatesUtils.fromLastMonthsToNow(1);

                        return InsightsService
                            .fetchMonthlyInsightsFromTo(period.from, period.to);
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
                    insightsOverview: function (DatesUtils, InsightsService, INSIGHTS_INTERVAL) {
                        var period = DatesUtils.fromLastMonthsToNow(INSIGHTS_INTERVAL.QUARTER_YEAR);

                        return InsightsService
                            .fetchOverviewInsightsFromTo(period.from, period.to);
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
                controller: "InsightsProgressController",
                controllerAs: 'vm',
                resolve: {
                    insightsProgress: function (DatesUtils, InsightsService, INSIGHTS_INTERVAL) {
                        var period = DatesUtils.fromLastMonthsToNow(INSIGHTS_INTERVAL.QUARTER_YEAR);

                        return InsightsService
                            .fetchProgressInsightsFromTo(period.from, period.to);
                    },
                    monthsPerYearsStatistics: function (StatisticService) {
                        return StatisticService
                            .fetchInsightsMonthsPerYearStatistics();
                    },
                    categories: function (CategoryService) {
                        return CategoryService.getAllCategories();
                    }
                },
                title: "Insights progress - Revaluate",
                stateEventName: USER_ACTIVITY_EVENTS.insightsPage
            })

    });
