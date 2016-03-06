function ExpenseGroupedTransformerService(ExpenseTransformerService, Expense, ExpenseGrouped) {

  this.expenseGroupedApiResponseTransformer = function (responseData) {
    function toExpensesGrouped(queryResponse) {
      var groupedExpensesDTOList = _.map(queryResponse.groupedExpensesDTOList, function (expenseGroupedDtoEntry) {
        return new ExpenseGrouped({
          localDate: moment(expenseGroupedDtoEntry.localDate).toDate(),
          expenseDTOs: ExpenseTransformerService.expenseApiResponseTransformer({ data: expenseGroupedDtoEntry.expenseDTOs }),
        });
      });

      return {
        groupedExpensesDTOList: groupedExpensesDTOList,
        currentPage: queryResponse.currentPage,
        currentSize: queryResponse.currentSize,
        totalSize: queryResponse.totalSize,
      };
    }

    return toExpensesGrouped(responseData.data);
  };
}

export default ExpenseGroupedTransformerService;
