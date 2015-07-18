'use strict';

angular
    .module("revaluate.statistics")
    .factory("Statistics", function () {

        function Statistics() {

            /**
             * Represents the DTO model of the expense.
             */
            this.model = {

                /**
                 * Months per years insights
                 */
                insightsMonthsPerYears: {},

                overallTransactionsEmpty: false
            };

            this.isOverallTransactionsEmpty = function () {
                return this.overallTransactionsEmpty;
            };

        }

        Statistics.build = function () {
            return new Statistics();
        };

        return Statistics;
    });
