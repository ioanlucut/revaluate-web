(function () {
    'use strict';

    angular
        .module('revaluate.insights')
        .factory('InsightsOverview', function ($q, $http, InsightsService, InsightsTransformerService) {

            /**
             * Insights class.
             * @constructor
             */
            function InsightsOverview() {

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
            InsightsOverview.build = function (data) {
                if (_.isEmpty(data)) {
                    return new InsightsOverview();
                }

                return InsightsTransformerService.toInsight(data, new InsightsOverview());
            };

            return InsightsOverview;
        });
}());
