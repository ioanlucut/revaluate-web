'use strict';

angular
    .module("revaluate.insights", [
        "revaluate.common",
        "revaluate.expenses"
    ])
    .config(function ($stateProvider, USER_ACTIVITY_EVENTS) {

        $stateProvider
            .state("insights", {
                url: "/insights",
                templateUrl: '/app/insight/partials/insight.html',
                controller: "InsightController",
                controllerAs: 'vm',
                resolve: {
                    insight: function (InsightService) {
                        var from = moment().startOf('month');
                        var to = moment().endOf('month');

                        return InsightService
                            .fetchInsightsFromTo(from, to);
                    },
                    insightsMonthsPerYears: function (StatisticService) {
                        return StatisticService
                            .fetchStatistics();
                    }
                },
                title: "Insights - Revaluate",
                stateEventName: USER_ACTIVITY_EVENTS.insightsPage
            })

    });
