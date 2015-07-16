'use strict';

angular
    .module("revaluate.insights")
    .factory("Insights", function ($q, $http, InsightsService, InsightTransformerService) {

        /**
         * Insights class.
         * @constructor
         */
        function Insights() {

            /**
             * Represents the DTO model of the insights.
             */
            this.model = {

                /**
                 * The insights data.
                 */
                insightData: [],

                /**
                 * The insights colors
                 */
                insightColors: [],

                /**
                 * The insights labels
                 */
                insightLabels: [],

                /**
                 * From date period of the insights.
                 */
                from: "",

                /**
                 * To date period of the insights.
                 */
                to: "",

                /**
                 * Total amount spent
                 */
                totalAmountSpent: 0,

                /**
                 * Number of transactions for selected period.
                 */
                numberOfTransactions: 0,

                /**
                 * Total number of transactions overall.
                 */
                totalNumberOfTransactions: 0,

                /**
                 * Total per categories
                 */
                totalPerCategoryInsightDTOs: []
            };

            /**
             * Is insights empty.
             * @returns {boolean}
             */
            this.isEmpty = function () {
                return this.model.insightData.length === 0;
            };

            this.isTransactionsEmpty = function () {
                return this.model.numberOfTransactions === 0;
            };

            this.isManyTransactions = function () {
                return this.model.numberOfTransactions > 1;
            };

        }

        /**
         * Builds a insights with given data.
         */
        Insights.build = function (data) {
            if ( _.isEmpty(data) ) {
                return new Insights();
            }

            return InsightTransformerService.toInsight(data, new Insights());
        };

        return Insights;
    });
