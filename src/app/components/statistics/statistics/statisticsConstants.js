export default

  /**
   * Statistics constants.
   */
  angular
    .module('revaluate.statistics')
    .constant('STATISTIC_URLS', {
      expensesMonthsPerYearsStatistics: 'statistics/expenses_months_per_years',
      goalsPerYearsStatistics: 'statistics/goals_months_per_years',
    });

