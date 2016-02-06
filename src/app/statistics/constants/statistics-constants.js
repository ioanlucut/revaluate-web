'use strict';

/**
 * Statistics constants.
 */
export default angular
    .module('revaluate.statistics')
    .constant('STATISTIC_URLS', {
        expensesMonthsPerYearsStatistics: 'statistics/expenses_months_per_years',
        goalsPerYearsStatistics: 'statistics/goals_months_per_years'
    })
    .name;
