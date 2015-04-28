/**
 * Insights service which encapsulates the whole logic related to insights.
 */
angular
    .module("insights")
    .service("InsightService", function (INSIGHTS_URLS, $q, $http, $injector, InsightTransformerService) {

        /**
         * Get all insights of current user
         * @returns {*}
         */
        this.fetchInsightsFromTo = function (from, to) {
            var fromFormatted = moment(from).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
            var toFormatted = moment(to).format('YYYY-MM-DDTHH:mm:ss') + 'Z';

            return $http
                .get(URLTo.api(INSIGHTS_URLS.fetchInsights, { ":from": fromFormatted, ":to": toFormatted }))
                .then(function (response) {

                    return InsightTransformerService.toInsight(response.data, $injector.get('Insight').build());
                }).catch(function (response) {
                    return $q.reject(response);
                });
        };
    });
