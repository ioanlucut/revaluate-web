/**
 * Insights constants.
 */
angular
    .module("revaluate.insights")
    .constant("INSIGHTS_URLS", {
        fetchInsights: "insights/retrieve_from_to?from=:from&to=:to"
    });