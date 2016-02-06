'use strict';

export default angular
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

        /**
         * Get all expenses of current user of a given expense
         */
        this.getAllExpensesOfCategory = function (categoryId, from, to, tracker) {
            var fromFormatted = DatesUtils.formatDate(from),
                toFormatted = DatesUtils.formatDate(to);

            return $http
                .get(URLTo.api(EXPENSE_URLS.allExpensesOfCategory, {
                    ':categoryId': categoryId,
                    ':from': fromFormatted,
                    ':to': toFormatted
                }), { tracker: tracker })
                .then(ExpenseTransformerService.expenseApiResponseTransformer);
        };

        /**
         * Bulk delete action of a list of expenses.
         */
        this.bulkDelete = function (expenses, tracker) {
            return $http
                .put(URLTo.api(EXPENSE_URLS.bulkDelete), ExpenseTransformerService.expenseApiRequestTransformer(expenses), { tracker: tracker });
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

    })
    .name;
