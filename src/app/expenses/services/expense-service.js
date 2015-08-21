(function () {
    'use strict';

    angular
        .module('revaluate.expenses')
        .service('ExpenseService', function (EXPENSE_URLS, $q, $http, DatesUtils, ExpenseGroupedTransformerService, ExpenseTransformerService) {

            this.createExpense = function (expense, tracker) {
                return $http
                    .post(URLTo.api(EXPENSE_URLS.create), ExpenseTransformerService.expenseApiRequestTransformer(expense), { tracker: tracker })
                    .then(ExpenseTransformerService.expenseApiResponseTransformer);
            };

            this.updateExpense = function (expense, tracker) {
                var expenseDto = ExpenseTransformerService.expenseApiRequestTransformer(expense);

                return $http
                    .put(URLTo.api(EXPENSE_URLS.update), expenseDto, { tracker: tracker })
                    .then(ExpenseTransformerService.expenseApiResponseTransformer);
            };

            this.deleteExpense = function (expense, tracker) {
                return $http
                    .delete(URLTo.api(EXPENSE_URLS.delete, { ':id': expense.id }), { tracker: tracker });
            };

            this.getAllExpenses = function () {
                return $http
                    .get(URLTo.api(EXPENSE_URLS.allExpenses))
                    .then(ExpenseTransformerService.expenseApiResponseTransformer);
            };

            /**
             * Get all expenses of current user of a given expense
             */
            this.getAllExpensesOfExpense = function (expenseId, from, to) {
                var fromFormatted = DatesUtils.formatDate(from),
                    toFormatted = DatesUtils.formatDate(to);

                return $http
                    .get(URLTo.api(EXPENSE_URLS.allExpensesOfCategory, {
                        ':expenseId': expenseId,
                        ':from': fromFormatted,
                        ':to': toFormatted
                    }))
                    .then(ExpenseTransformerService.expenseApiResponseTransformer);
            };

            /**
             * Bulk delete action of a list of expenses.
             */
            this.bulkDelete = function (expenses) {
                return $http
                    .put(URLTo.api(EXPENSE_URLS.bulkDelete), ExpenseTransformerService.expenseApiRequestTransformer(expenses));
            };

            /**
             * Get all grouped expenses of current user
             */
            this.getAllExpensesGrouped = function (page, size) {
                return $http
                    .get(URLTo.api(EXPENSE_URLS.allExpensesGrouped, {
                        ':page': page,
                        ':size': size
                    }))
                    .then(ExpenseGroupedTransformerService.expenseGroupedApiResponseTransformer);
            };

            this.formatDate = function (givenDate) {
                return moment(givenDate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
            }
        });
}());
