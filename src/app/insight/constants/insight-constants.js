/**
 * Insights constants.
 */
angular
    .module("insights")
    .constant("INSIGHTS_URLS", {
        fetchInsights: "insights/retrieve_from_to?from=:from&to=:to"
    });