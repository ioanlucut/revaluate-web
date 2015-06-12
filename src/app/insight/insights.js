'use strict';

angular
    .module("revaluate.insights", [
        "revaluate.common",
        "revaluate.expenses"
    ])
    .config(function ($stateProvider, MIXPANEL_EVENTS) {

        $stateProvider
            .state("insights", {
                url: "/insights",
                templateUrl: 'app/insight/partials/insight.html',
                controller: "InsightController",
                resolve: {
                    insight: function (InsightService) {
                        var from = moment().startOf('month');
                        var to = moment().endOf('month');

                        return InsightService
                            .fetchInsightsFromTo(from, to);
                    },
                    statistics: function (StatisticService) {
                        return StatisticService
                            .fetchStatistics();
                    }
                },
                title: "Insights - Revaluate",
                mixpanelId: MIXPANEL_EVENTS.insightsPage
            })

    });
