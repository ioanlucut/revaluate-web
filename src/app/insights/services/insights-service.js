(function () {
    'use strict';

    /**
     * InsightsMonthly service which encapsulates the whole logic related to insights.
     */
    angular
        .module('revaluate.insights')
        .service('InsightsService', function (INSIGHTS_URLS, $q, $http, $injector, InsightsDaily, InsightsTransformerService, DatesUtils) {

            this.fetchMonthlyInsightsFromTo = function (from, to) {
                var fromFormatted = DatesUtils.formatDate(from),
                    toFormatted = DatesUtils.formatDate(to);

                return $http
                    .get(URLTo.api(INSIGHTS_URLS.fetchInsights, { ':from': fromFormatted, ':to': toFormatted }))
                    .then(function (response) {

                        return InsightsTransformerService.toInsight(response.data);
                    }).catch(function (response) {
                        return $q.reject(response);
                    });
            };

            this.fetchOverviewInsightsFromTo = function (from, to) {
                var fromFormatted = DatesUtils.formatDate(from),
                    toFormatted = DatesUtils.formatDate(to);

                return $http
                    .get(URLTo.api(INSIGHTS_URLS.fetchOverviewInsights, { ':from': fromFormatted, ':to': toFormatted }))
                    .then(function (response) {

                        return InsightsTransformerService.toInsightOverview(response.data);
                    }).catch(function (response) {
                        return $q.reject(response);
                    });
            };

            this.fetchProgressInsightsFromTo = function (from, to) {
                var fromFormatted = DatesUtils.formatDate(from),
                    toFormatted = DatesUtils.formatDate(to);

                return $http
                    .get(URLTo.api(INSIGHTS_URLS.fetchProgressInsights, { ':from': fromFormatted, ':to': toFormatted }))
                    .then(function (response) {

                        return InsightsTransformerService.toInsightsProgress(response.data);
                    }).catch(function (response) {
                        return $q.reject(response);
                    });
            };

            this.fetchDailyInsightsFromTo = function (from, to) {
                var fromFormatted = DatesUtils.formatDate(from),
                    toFormatted = DatesUtils.formatDate(to);

                return $http
                    .get(URLTo.api(INSIGHTS_URLS.fetchDailyInsights, { ':from': fromFormatted, ':to': toFormatted }))
                    .then(InsightsTransformerService.apiResponseTransformer)
                    .catch(function (response) {
                        return $q.reject(response);
                    });
            };
        });
}());
