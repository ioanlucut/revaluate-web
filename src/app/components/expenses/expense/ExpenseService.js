function ExpenseService(EXPENSE_URLS,
                        $q,
                        $http,
                        DatesUtils,
                        ExpenseGroupedTransformerService,
                        ExpenseTransformerService) {

  this.createExpense = (expense, tracker) => $http
    .post(URLTo.api(EXPENSE_URLS.create), ExpenseTransformerService.expenseApiRequestTransformer(expense), { tracker })
    .then(ExpenseTransformerService.expenseApiResponseTransformer);

  this.updateExpense = (expense, tracker) => {
    const expenseDto = ExpenseTransformerService.expenseApiRequestTransformer(expense);

    return $http
      .put(URLTo.api(EXPENSE_URLS.update), expenseDto, { tracker })
      .then(ExpenseTransformerService.expenseApiResponseTransformer);
  };

  /**
   * Get all expenses of current user of a given expense
   */
  this.getAllExpensesOfCategory = (categoryId, from, to, tracker) => {
    const fromFormatted = DatesUtils.formatDate(from), toFormatted = DatesUtils.formatDate(to);

    return $http
      .get(URLTo.api(EXPENSE_URLS.allExpensesOfCategory, {
        ':categoryId': categoryId,
        ':from': fromFormatted,
        ':to': toFormatted,
      }), { tracker })
      .then(ExpenseTransformerService.expenseApiResponseTransformer);
  };

  /**
   * Bulk delete action of a list of expenses.
   */
  this.bulkDelete = (expenses, tracker) => $http
    .put(URLTo.api(EXPENSE_URLS.bulkDelete), ExpenseTransformerService.expenseApiRequestTransformer(expenses), { tracker });

  /**
   * Get all grouped expenses of current user
   */
  this.getAllExpensesGrouped = (page, size) => $http
    .get(URLTo.api(EXPENSE_URLS.allExpensesGrouped, {
      ':page': page,
      ':size': size,
    }))
    .then(ExpenseGroupedTransformerService.expenseGroupedApiResponseTransformer);

}

export default ExpenseService;
