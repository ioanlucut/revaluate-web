export default

  /**
   * Insights constants.
   */
  angular
    .module('revaluate.insights')
    .constant('INSIGHTS_CHARTS', {
      BAR: 'BAR',
      DOUGHNUT: 'DOUGHNUT',
    })
    .constant('INSIGHTS_INTERVAL', {
      QUARTER_YEAR: 3,
      HALF_YEAR: 6,
      YEAR: 12,
    })
    .constant('INSIGHTS_URLS', {
      fetchInsights: 'insights/retrieve_from_to?from=:from&to=:to',
      fetchOverviewInsights: 'insights/insights_overview_retrieve_from_to?from=:from&to=:to',
      fetchProgressInsights: 'insights/insights_progress_retrieve_from_to?from=:from&to=:to',
      fetchDailyInsights: 'insights/insights_daily_retrieve_from_to?from=:from&to=:to',
    });

