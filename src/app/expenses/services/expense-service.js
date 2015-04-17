/**
 * Expenses service which encapsulates the whole logic related to expenses.
 */
angular
    .module("expenses")
    .service("ExpenseService", function (EXPENSE_URLS, $q, $http, $injector, ExpenseTransformerService) {

        /**
         * Update a expense.
         * @param expense
         * @returns {*}
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
         * Update a expense.
         * @param expense
         * @returns {*}
         */
        this.updateExpense = function (expense) {
            var expenseDto = ExpenseTransformerService.toExpenseDto(expense);

            return $http
                .put(URLTo.api(EXPENSE_URLS.update, { ":id": expenseDto.id }), expenseDto)
                .then(function (response) {
                    ExpenseTransformerService.toExpense(response.data, expense);

                    return response;
                });
        };

        /**
         * UnSubscribe from a expense.
         * @param expense
         * @returns {*}
         */
        this.unSubscribeFromExpense = function (expense) {
            var expenseDto = ExpenseTransformerService.toExpenseDto(expense);

            return $http
                .post(URLTo.api(EXPENSE_URLS.unSubscribeExpense, { ":id": expenseDto.id }), expenseDto);
        };

        /**
         * Delete a expense.
         * @param expense
         * @returns {*}
         */
        this.deleteExpense = function (expense) {
            var expenseDto = ExpenseTransformerService.toExpenseDto(expense);

            return $http
                .delete(URLTo.api(EXPENSE_URLS.delete, { ":id": expenseDto.id }), expenseDto)
                .then(function (response) {
                    ExpenseTransformerService.toExpense(response.data, expense);

                    return response.data;
                });
        };

        /**
         * Get all expenses of current user
         * @returns {*}
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
         * Get details of a expense.
         * @param id
         * @returns {*}
         */
        this.getDetails = function (id) {
            return $http
                .get(URLTo.api(EXPENSE_URLS.details, { ":id": id }))
                .then(function (response) {
                    return ExpenseTransformerService.toExpense(response.data, $injector.get('Expense').build());
                });
        };
    });
