(function () {
    'use strict';

    angular
        .module('revaluate.insights')
        .factory('InsightsDaily', function ($q, $http, InsightsService, InsightsTransformerService) {

            /**
             * Insights class.
             */
            function InsightsDaily() {

                /**
                 * Represents the DTO model of the insights.
                 */
                this.model = {

                    /**
                     * Total amount spent
                     */
                    totalAmountSpent: 0,

                    totalPerDayDTOs: []
                };
            }

            /**
             * Builds a insights with given data.
             */
            InsightsDaily.build = function (data) {
                if (_.isEmpty(data)) {
                    return new InsightsDaily();
                }

                return InsightsTransformerService.toInsightsDaily(data, new InsightsDaily());
            };

            return InsightsDaily;
        });
}());
