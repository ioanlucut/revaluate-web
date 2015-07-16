'use strict';

/**
 * Insights service which encapsulates the whole logic related to insights.
 */
angular
    .module("revaluate.insights")
    .service("InsightsService", function (INSIGHTS_URLS, $q, $http, $injector, InsightTransformerService) {

        this.fetchMonthlyInsightsFromTo = function (from, to) {
            var fromFormatted = InsightTransformerService.formatDate(from);
            var toFormatted = InsightTransformerService.formatDate(to);

            return $http
                .get(URLTo.api(INSIGHTS_URLS.fetchInsights, { ":from": fromFormatted, ":to": toFormatted }))
                .then(function (response) {

                    return InsightTransformerService.toInsight(response.data);
                }).catch(function (response) {
                    return $q.reject(response);
                });
        };

        this.fetchOverviewInsightsFromTo = function (from, to) {
            var fromFormatted = InsightTransformerService.formatDate(from);
            var toFormatted = InsightTransformerService.formatDate(to);

            return $http
                .get(URLTo.api(INSIGHTS_URLS.fetchOverviewInsights, { ":from": fromFormatted, ":to": toFormatted }))
                .then(function (response) {

                    return InsightTransformerService.toInsightOverview(response.data);
                }).catch(function (response) {
                    return $q.reject(response);
                });
        };
    });
