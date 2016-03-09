function ExpenseGroupedTransformerService(ExpenseTransformerService, Expense, ExpenseGrouped) {

  this.expenseGroupedApiResponseTransformer = responseData => {
    function toExpensesGrouped(queryResponse) {
      const groupedExpensesDTOList = _.map(queryResponse.groupedExpensesDTOList, expenseGroupedDtoEntry => new ExpenseGrouped({
        localDate: moment(expenseGroupedDtoEntry.localDate).toDate(),
        expenseDTOs: ExpenseTransformerService.expenseApiResponseTransformer({ data: expenseGroupedDtoEntry.expenseDTOs }),
      }));

      return {
        groupedExpensesDTOList,
        currentPage: queryResponse.currentPage,
        currentSize: queryResponse.currentSize,
        totalSize: queryResponse.totalSize,
      };
    }

    return toExpensesGrouped(responseData.data);
  };
}

export default ExpenseGroupedTransformerService;
