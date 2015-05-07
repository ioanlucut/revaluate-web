angular
    .module("insights", [
        "common",
        "expenses"
    ])
    .config(["$stateProvider", function ($stateProvider) {

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
                title: "Insights - Revaluate"
            })

    }]);