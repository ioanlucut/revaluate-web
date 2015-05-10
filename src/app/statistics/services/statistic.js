angular
    .module("revaluate.statistics")
    .factory("Statistic", function ($q, StatisticTransformerService) {

        /**
         * Statistic class.
         * @constructor
         */
        function Statistic() {

            /**
             * Represents the DTO model of the statistic.
             */
            this.model = {

                /**
                 * First existing expense date
                 */
                firstExistingExpenseDate: "",

                /**
                 * Last existing expense date
                 */
                lastExistingExpenseDate: ""
            };
        }

        /**
         * Builds a statistic with given data.
         * @param data
         * @returns {Statistic}
         */
        Statistic.build = function (data) {
            if ( _.isEmpty(data) ) {
                return new Statistic();
            }

            return StatisticTransformerService.toStatistic(data, new Statistic());
        };

        return Statistic;
    });