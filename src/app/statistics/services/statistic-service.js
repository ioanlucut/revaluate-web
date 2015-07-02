'use strict';

/**
 * Summaries service which encapsulates the whole logic related to statistics.
 */
angular
    .module("revaluate.statistics")
    .service("StatisticService", function (STATISTIC_URLS, $q, $http) {

        /**
         * Get all expense statistics of current user. They represents a map of expenses per years/months.
         * @returns {*}
         */
        this.fetchStatistics = function () {

            return $http
                .get(URLTo.api(STATISTIC_URLS.insightsMonthsPerYears))
                .then(function (response) {

                    return response.data;
                }).catch(function (response) {
                    return $q.reject(response);
                });
        };
    });
