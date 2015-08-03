(function () {
    'use strict';

    /**
     * Expenses constants.
     */
    angular
        .module('revaluate.expenses')
        .constant('EXPENSE_URLS', {
            create: 'expenses',
            update: 'expenses',
            details: 'expenses/:id',
            delete: 'expenses/:id',
            bulkDelete: 'expenses/bulkDelete',
            allExpenses: 'expenses/retrieve',
            allExpensesOfCategory: 'expenses/retrieve_from_to_of_category/:categoryId?from=:from&to=:to'
        })
        .constant('EXPENSE_EVENTS', {
            isCreated: 'expense-is-created',
            isDeleted: 'expense-is-deleted',
            isUpdated: 'expense-is-updated'
        });
}());
