(function () {
    'use strict';

    angular
        .module('revaluate.statistics')
        .factory('Statistics', function () {

            function Statistics() {

                /**
                 * Represents the DTO model of the expense.
                 */
                this.model = {

                    /**
                     * Months per years insights
                     */
                    insightsMonthsPerYears: {},

                    /**
                     * Is overall transasctions empty ?
                     */
                    overallTransactionsEmpty: false
                };

                this.isOverallTransactionsEmpty = function () {
                    return this.model.overallTransactionsEmpty;
                };

            }

            Statistics.build = function () {
                return new Statistics();
            };

            return Statistics;
        });
}());
