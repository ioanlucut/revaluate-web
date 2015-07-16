'use strict';

angular
    .module("revaluate.insights")
    .factory("InsightOverview", function ($q, $http, InsightsService, InsightTransformerService) {

        /**
         * Insights class.
         * @constructor
         */
        function InsightOverview() {

            /**
             * Represents the DTO model of the insights.
             */
            this.model = {

                /**
                 * Total amount spent
                 */
                totalAmountSpent: 0,

                /**
                 * The insights data.
                 */
                insightData: [],

                /**
                 * The insights labels
                 */
                insightLabels: [],

                /**
                 * Insights overview
                 */
                insightsOverview: []
            };
        }

        /**
         * Builds a insights with given data.
         */
        InsightOverview.build = function (data) {
            if ( _.isEmpty(data) ) {
                return new InsightOverview();
            }

            return InsightTransformerService.toInsight(data, new InsightOverview());
        };

        return InsightOverview;
    });
