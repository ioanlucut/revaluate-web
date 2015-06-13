'use strict';

/**
 * Summaries service which encapsulates the whole logic related to statistics.
 */
angular
    .module("revaluate.statistics")
    .service("StatisticService", function (STATISTIC_URLS, $q, $http, $injector, StatisticTransformerService) {

        /**
         * Get all statistics of current user
         * @returns {*}
         */
        this.fetchStatistics = function () {

            return $http
                .get(URLTo.api(STATISTIC_URLS.fetchStatistic))
                .then(function (response) {

                    return StatisticTransformerService.toStatistic(response.data, $injector.get('Statistic').build());
                }).catch(function (response) {
                    return $q.reject(response);
                });
        };
    });
