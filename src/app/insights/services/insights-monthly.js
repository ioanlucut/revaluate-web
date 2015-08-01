(function () {
    "use strict";

    angular
        .module("revaluate.insights")
        .factory("InsightsMonthly", function ($q, $http, InsightsService, InsightsTransformerService) {

            /**
             * InsightsMonthly class.
             * @constructor
             */
            function InsightsMonthly() {

                /**
                 * Represents the DTO model of the insights.
                 */
                this.model = {

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
                     * Total per categories
                     */
                    totalPerCategoryInsightsDTOs: []
                };

                /**
                 * Is insights empty.
                 * @returns {boolean}
                 */
                this.isEmpty = function () {
                    return this.model.totalPerCategoryInsightsDTOs.length === 0;
                };

                this.isTransactionsEmpty = function () {
                    return this.model.numberOfTransactions === 0;
                };

                this.isManyTransactions = function () {
                    return this.model.numberOfTransactions > 5;
                };

            }

            /**
             * Builds a insights with given data.
             */
            InsightsMonthly.build = function (data) {
                if ( _.isEmpty(data) ) {
                    return new InsightsMonthly();
                }

                return InsightsTransformerService.toInsight(data, new InsightsMonthly());
            };

            return InsightsMonthly;
        });
}());
