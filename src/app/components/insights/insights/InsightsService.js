/**
 * InsightsMonthly service which encapsulates the whole logic related to insights.
 */
function InsightsService(INSIGHTS_URLS,
                         $http,
                         InsightsTransformerService,
                         DatesUtils) {
  'ngInject';

  this.fetchMonthlyInsightsFromTo = (from, to, tracker) => {
    const fromFormatted = DatesUtils.formatDate(from);
    const toFormatted = DatesUtils.formatDate(to);

    return $http
      .get(URLTo.api(INSIGHTS_URLS.fetchInsights, {
        ':from': fromFormatted,
        ':to': toFormatted,
      }), { tracker })
      .then(InsightsTransformerService.insightsMonthlyApiResponseTransformer);
  };

  this.fetchOverviewInsightsFromTo = (from, to) => {
    const fromFormatted = DatesUtils.formatDate(from);
    const toFormatted = DatesUtils.formatDate(to);

    return $http
      .get(URLTo.api(INSIGHTS_URLS.fetchOverviewInsights, {
        ':from': fromFormatted,
        ':to': toFormatted,
      }))
      .then(InsightsTransformerService.insightsOverviewApiResponseTransformer);
  };

  this.fetchProgressInsightsFromTo = (from, to) => {
    const fromFormatted = DatesUtils.formatDate(from);
    const toFormatted = DatesUtils.formatDate(to);

    return $http
      .get(URLTo.api(INSIGHTS_URLS.fetchProgressInsights, {
        ':from': fromFormatted,
        ':to': toFormatted,
      }))
      .then(InsightsTransformerService.insightsProgressApiResponseTransformer);
  };

  this.fetchDailyInsightsFromTo = (from, to, tracker) => {
    const fromFormatted = DatesUtils.formatDate(from);
    const toFormatted = DatesUtils.formatDate(to);

    return $http
      .get(URLTo.api(INSIGHTS_URLS.fetchDailyInsights, {
        ':from': fromFormatted,
        ':to': toFormatted,
      }), { tracker })
      .then(InsightsTransformerService.insightDailyApiResponseTransformer);
  };
}

export default InsightsService;
