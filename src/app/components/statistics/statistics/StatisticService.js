export default

  /**
   * Summaries service which encapsulates the whole logic related to statistics.
   */
  angular
    .module('revaluate.statistics')
    .service('StatisticService', function (STATISTIC_URLS, $q, $http, StatisticTransformerService) {

      /**
       * Get all expense statistics of current user. They represents a map of expenses per years/months.
       */
      this.fetchExpensesMonthsPerYearStatistics = function () {

        return $http
          .get(URLTo.api(STATISTIC_URLS.expensesMonthsPerYearsStatistics))
          .then(StatisticTransformerService.statisticApiResponseTransformer);
      };

      /**
       * Get all goals statistics of current user. They represents a map of expenses per years/months.
       */
      this.fetchGoalsMonthsPerYearStatistics = function (tracker) {

        return $http
          .get(URLTo.api(STATISTIC_URLS.goalsPerYearsStatistics), { tracker: tracker })
          .then(StatisticTransformerService.statisticApiResponseTransformer);
      };

    });

