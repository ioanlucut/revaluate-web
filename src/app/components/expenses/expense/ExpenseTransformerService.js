function ExpenseTransformerService(Expense) {

  this.expenseApiRequestTransformer = requestData => {

    function buildExpensePayload(data) {
      const newly = _.extend(data, { spentDate: moment(data.spentDate).format('YYYY-MM-DDTHH:mm:ss.hhh') });

      return _.omit(newly, ['modifiedDate', 'createdDate', 'marked']);
    }

    if (_.isArray(requestData)) {
      return _.map(requestData, buildExpensePayload);
    } else {
      return buildExpensePayload(requestData);
    }
  };

  this.expenseApiResponseTransformer = responseData => {
    function buildExpense(data) {
      return new Expense(_.extend(data, {
        spentDate: toDate(data.spentDate),
        modifiedDate: toDate(data.modifiedDate),
        createdDate: toDate(data.createdDate),
      }));
    }

    function toDate(candidate) {
      return moment(candidate).toDate();
    }

    if (_.isArray(responseData.data)) {
      return _.map(responseData.data, buildExpense);
    } else {
      return buildExpense(responseData.data);
    }
  };
}

export default ExpenseTransformerService;
