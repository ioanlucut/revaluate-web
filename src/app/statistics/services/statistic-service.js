'use strict';

/**
 * Summaries service which encapsulates the whole logic related to statistics.
 */
angular
    .module("revaluate.statistics")
    .service("StatisticService", function (STATISTIC_URLS, $q, $http, StatisticsTransformerService) {

        /**
         * Get all expense statistics of current user. They represents a map of expenses per years/months.
         */
        this.fetchInsightsMonthsPerYearStatistics = function () {

            return $http
                .get(URLTo.api(STATISTIC_URLS.insightsMonthsPerYearsStatistics))
                .then(function (response) {

                    return StatisticsTransformerService.toStatistics(response.data);
                }).catch(function (response) {
                    return $q.reject(response);
                });
        };
    });
