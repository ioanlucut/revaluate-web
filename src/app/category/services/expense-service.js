/**
 * Expenses service which encapsulates the whole logic related to expenses.
 */
angular
    .module("expenses")
    .service("ExpenseService", function (EXPENSE_URLS, $q, $http, $injector, ExpenseGroupService, ExpenseTransformerService) {

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
                .put(URLTo.api(EXPENSE_URLS.update, { ":expenseId": expenseDto.expenseId }), expenseDto)
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
                .post(URLTo.api(EXPENSE_URLS.unSubscribeExpense, { ":expenseId": expenseDto.expenseId }), expenseDto);
        };

        /**
         * Delete a expense.
         * @param expense
         * @returns {*}
         */
        this.deleteExpense = function (expense) {
            var expenseDto = ExpenseTransformerService.toExpenseDto(expense);

            return $http
                .delete(URLTo.api(EXPENSE_URLS.delete, { ":expenseId": expenseDto.expenseId }), expenseDto)
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
         * Gets all expenses grouped by upcoming and past expenses.
         * @returns {*}
         */
        this.getAllExpensesGrouped = function () {
            var deferred = $q.defer();

            this
                .getAllExpenses()
                .then(function (response) {
                    deferred.resolve(ExpenseGroupService.getPastAndUpcomingExpenses(response));
                }).catch(function () {
                    deferred.resolve(ExpenseGroupService.getPastAndUpcomingExpenses([]));
                });

            return deferred.promise;
        };

        /**
         * Get details of a expense.
         * @param expenseId
         * @returns {*}
         */
        this.getDetails = function (expenseId) {
            return $http
                .get(URLTo.api(EXPENSE_URLS.details, { ":expenseId": expenseId }))
                .then(function (response) {
                    return ExpenseTransformerService.toExpense(response.data, $injector.get('Expense').build());
                });
        };
    });
