'use strict';

/**
 * Summaries constants.
 */
angular
    .module("revaluate.statistics")
    .constant("STATISTIC_URLS", {
        fetchStatistic: "insights/summary_insights",
        insightsMonthsPerYears: "insights/insights_months_per_years"
    });
