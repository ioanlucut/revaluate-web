(function () {
    'use strict';

    /**
     * Expenses service which encapsulates the whole logic related to expenses.
     */
    angular
        .module('revaluate.expenses')
        .service('ExpenseService', function (EXPENSE_URLS, $q, $http, $injector, ExpenseTransformerService, DatesUtils) {

            /**
             * Create expense.
             */
            this.createExpense = function (expense) {
                return $http
                    .post(URLTo.api(EXPENSE_URLS.create), ExpenseTransformerService.toExpenseDto(expense))
                    .then(function (response) {
                        ExpenseTransformerService.toExpense(response.data, expense);

                        return response;
                    });
            };

            /**
             * Update expense.
             */
            this.updateExpense = function (expense) {
                var expenseDto = ExpenseTransformerService.toExpenseDto(expense);

                return $http
                    .put(URLTo.api(EXPENSE_URLS.update), expenseDto)
                    .then(function (response) {
                        ExpenseTransformerService.toExpense(response.data, expense);

                        return response;
                    });
            };

            /**
             * Delete expense.
             */
            this.deleteExpense = function (expense) {
                var expenseDto = ExpenseTransformerService.toExpenseDto(expense);

                return $http
                    .delete(URLTo.api(EXPENSE_URLS.delete, { ':id': expenseDto.id }), expenseDto)
                    .then(function (response) {
                        ExpenseTransformerService.toExpense(response.data, expense);

                        return response.data;
                    });
            };

            /**
             * Get all expenses of current user
             */
            this.getAllExpenses = function () {
                return $http
                    .get(URLTo.api(EXPENSE_URLS.allExpenses))
                    .then(function (response) {

                        return ExpenseTransformerService.toExpenses(response.data)
                    }).catch(function (response) {
                        return $q.reject(response);
                    });
            };

            /**
             * Get all grouped expenses of current user
             */
            this.getAllExpensesGrouped = function () {
                return $http
                    .get(URLTo.api(EXPENSE_URLS.allExpenses))
                    .then(function (response) {

                        return ExpenseTransformerService.toExpensesGrouped(response.data)
                    }).catch(function (response) {
                        return $q.reject(response);
                    });
            };

            /**
             * Get all expenses of current user of a given category
             */
            this.getAllExpensesOfCategory = function (categoryId, from, to) {
                var fromFormatted = DatesUtils.formatDate(from),
                 toFormatted = DatesUtils.formatDate(to);

                return $http
                    .get(URLTo.api(EXPENSE_URLS.allExpensesOfCategory, {
                        ':categoryId': categoryId,
                        ':from': fromFormatted,
                        ':to': toFormatted
                    }))
                    .then(function (response) {

                        return ExpenseTransformerService.toExpenses(response.data)
                    }).catch(function (response) {
                        return $q.reject(response);
                    });
            };

            /**
             * Get details of a expense.
             */
            this.getDetails = function (id) {
                return $http
                    .get(URLTo.api(EXPENSE_URLS.details, { ':id': id }))
                    .then(function (response) {
                        return ExpenseTransformerService.toExpense(response.data, $injector.get('Expense').build());
                    });
            };

            /**
             * Bulk delete action of a list of expenses.
             * @returns {*}
             */
            this.bulkDelete = function (categories) {
                return $http
                    .put(URLTo.api(EXPENSE_URLS.bulkDelete), ExpenseTransformerService.toExpenseDTOs(categories))
                    .then(function (response) {

                        return response.data;
                    });
            };

            this.formatDate = function (givenDate) {
                return moment(givenDate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
            }
        });
}());
