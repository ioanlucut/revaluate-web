angular
    .module("insights")
    .factory("Insight", function ($q, $http, InsightService, InsightTransformerService) {

        /**
         * Insight class.
         * @constructor
         */
        function Insight() {

            /**
             * Represents the DTO model of the insight.
             */
            this.model = {

                /**
                 * The insight data.
                 */
                insightData: [],

                /**
                 * The insight colors
                 */
                insightColors: [],

                /**
                 * The insight labels
                 */
                insightLabels: [],

                /**
                 * From date period of the insight.
                 */
                from: "",

                /**
                 * To date period of the insight.
                 */
                to: "",

                /**
                 * Total amount spent
                 */
                totalAmountSpent: 0,

                /**
                 * Number of transactions
                 */
                numberOfTransactions: 0,

                /**
                 * Total per categories
                 */
                totalPerCategoryInsightDTOs: [],

                /**
                 * Summary insights data
                 */
                summaryInsightsDTO: {

                    /**
                     * First existing expense date
                     */
                    firstExistingExpenseDate: "",

                    /**
                     * Last existing expense date
                     */
                    lastExistingExpenseDate: ""
                }
            };

            /**
             * Is insight empty.
             * @returns {boolean}
             */
            this.isEmpty = function () {
                return this.model.insightData.length === 0;
            };
        }

        /**
         * Builds a insight with given data.
         * @param data
         * @returns {Insight}
         */
        Insight.build = function (data) {
            if ( _.isEmpty(data) ) {
                return new Insight();
            }

            return InsightTransformerService.toInsight(data, new Insight());
        };

        return Insight;
    });