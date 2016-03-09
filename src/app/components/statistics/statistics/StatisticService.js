/**
 * Summaries service which encapsulates the whole logic related to statistics.
 */
function StatisticService(STATISTIC_URLS, $q, $http, StatisticTransformerService) {

  /**
   * Get all expense statistics of current user. They represents a map of expenses per years/months.
   */
  this.fetchExpensesMonthsPerYearStatistics = () => $http
    .get(URLTo.api(STATISTIC_URLS.expensesMonthsPerYearsStatistics))
    .then(StatisticTransformerService.statisticApiResponseTransformer);

  /**
   * Get all goals statistics of current user. They represents a map of expenses per years/months.
   */
  this.fetchGoalsMonthsPerYearStatistics = tracker => $http
    .get(URLTo.api(STATISTIC_URLS.goalsPerYearsStatistics), { tracker })
    .then(StatisticTransformerService.statisticApiResponseTransformer);

}

export default StatisticService;
