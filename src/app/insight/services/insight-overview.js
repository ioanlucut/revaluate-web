'use strict';

angular
    .module("revaluate.insights")
    .factory("InsightOverview", function ($q, $http, InsightService, InsightTransformerService) {

        /**
         * Insight class.
         * @constructor
         */
        function InsightOverview() {

            /**
             * Represents the DTO model of the insight.
             */
            this.model = {

                /**
                 * The insight data.
                 */
                insightData: [],

                /**
                 * The insight labels
                 */
                insightLabels: [],

                /**
                 * Insights overview
                 */
                insightsOverview: []
            };
        }

        /**
         * Builds a insight with given data.
         */
        InsightOverview.build = function (data) {
            if ( _.isEmpty(data) ) {
                return new InsightOverview();
            }

            return InsightTransformerService.toInsight(data, new InsightOverview());
        };

        return InsightOverview;
    });
