export default

  /**
   * InsightsMonthly service which encapsulates the whole logic related to insights.
   */
  angular
    .module('revaluate.insights')
    .service('InsightsService', function (INSIGHTS_URLS, $q, $http, $injector, InsightsDaily, InsightsTransformerService, DatesUtils) {

      this.fetchMonthlyInsightsFromTo = function (from, to, tracker) {
        var fromFormatted = DatesUtils.formatDate(from),
          toFormatted = DatesUtils.formatDate(to);

        return $http
          .get(URLTo.api(INSIGHTS_URLS.fetchInsights, {
            ':from': fromFormatted,
            ':to': toFormatted,
          }), { tracker: tracker })
          .then(InsightsTransformerService.insightsMonthlyApiResponseTransformer);
      };

      this.fetchOverviewInsightsFromTo = function (from, to) {
        var fromFormatted = DatesUtils.formatDate(from),
          toFormatted = DatesUtils.formatDate(to);

        return $http
          .get(URLTo.api(INSIGHTS_URLS.fetchOverviewInsights, { ':from': fromFormatted, ':to': toFormatted }))
          .then(InsightsTransformerService.insightsOverviewApiResponseTransformer);
      };

      this.fetchProgressInsightsFromTo = function (from, to) {
        var fromFormatted = DatesUtils.formatDate(from),
          toFormatted = DatesUtils.formatDate(to);

        return $http
          .get(URLTo.api(INSIGHTS_URLS.fetchProgressInsights, { ':from': fromFormatted, ':to': toFormatted }))
          .then(InsightsTransformerService.insightsProgressApiResponseTransformer);
      };

      this.fetchDailyInsightsFromTo = function (from, to, tracker) {
        var fromFormatted = DatesUtils.formatDate(from),
          toFormatted = DatesUtils.formatDate(to);

        return $http
          .get(URLTo.api(INSIGHTS_URLS.fetchDailyInsights, {
            ':from': fromFormatted,
            ':to': toFormatted,
          }), { tracker: tracker })
          .then(InsightsTransformerService.insightDailyApiResponseTransformer);
      };
    });

