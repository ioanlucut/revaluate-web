'use strict';

angular
    .module("revaluate.insights")
    .factory("InsightsProgress", function ($q, $http, InsightsService, InsightTransformerService) {

        /**
         * Insights class.
         * @constructor
         */
        function InsightsProgress() {

            /**
             * Represents the DTO model of the insights.
             */
            this.model = {

                /**
                 * Total amount spent
                 */
                totalAmountSpent: 0,

                /**
                 * Insights overview
                 */
                insightsMonthlyDTO: []
            };
        }

        /**
         * Builds a insights with given data.
         */
        InsightsProgress.build = function (data) {
            if ( _.isEmpty(data) ) {
                return new InsightsProgress();
            }

            return InsightTransformerService.toInsight(data, new InsightsProgress());
        };

        return InsightsProgress;
    });
