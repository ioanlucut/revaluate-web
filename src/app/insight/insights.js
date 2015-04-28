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
                        var from = moment().year(2012).hours(0).minutes(0).seconds(0);
                        var to = moment().year(2016).hours(0).minutes(0).seconds(0);

                        return InsightService.fetchInsightsFromTo(from, to);
                    }
                },
                title: "Insights - Revaluate"
            })

    }]);