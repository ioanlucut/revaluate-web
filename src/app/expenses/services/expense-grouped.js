'use strict';

function ExpenseGroupedFactory() {

    /**
     * Expense grouped class.
     */
    function ExpenseGrouped(data) {

        /**
         * The expenses.
         */
        this.expenseDTOs = data.expenseDTOs;

        /**
         * The expense description.
         */
        this.localDate = data.localDate;
    }

    return ExpenseGrouped;
}

export default angular
    .module('revaluate.expenses')
    .factory('ExpenseGrouped', ExpenseGroupedFactory)
    .name;
