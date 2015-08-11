(function () {
    'use strict';

    angular
        .module('revaluate.expenses')
        .factory('ExpenseGrouped', function ($q, $http, ExpenseService, ExpenseTransformerService) {

            /**
             * ExpenseGrouped class.
             * @constructor
             */
            function ExpenseGrouped() {

                /**
                 * Represents the DTO model of the expense.
                 */
                this.model = {

                    /**
                     * The expense id.
                     */
                    expenseDTOs: [],

                    /**
                     * The expense description.
                     */
                    localDate: {}
                };

            }

            /**
             * Builds a expense with given data.
             * @param data
             * @returns {Expense}
             */
            ExpenseGrouped.build = function (data) {
                if (_.isEmpty(data)) {
                    return new ExpenseGrouped();
                }

                return ExpenseTransformerService.toExpensesGrouped(data);
            };

            return ExpenseGrouped;
        });
}());
