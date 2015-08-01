(function () {
    "use strict";

    angular
        .module("revaluate.statistics")
        .service("StatisticsTransformerService", function ($injector, TransformerUtils) {

            this.toStatistics = function (statisticsDto, skipKeys) {
                var statistics = $injector.get('Statistics').build();

                TransformerUtils.copyKeysFromTo(statisticsDto, statistics.model, skipKeys);

                // ---
                // Compute this first time only.
                // ---
                statistics.model.overallTransactionsEmpty = _.keys(statistics.model.insightsMonthsPerYears).length === 0;

                return statistics;
            };

        });
}());
