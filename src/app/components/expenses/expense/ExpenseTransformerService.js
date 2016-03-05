export default

  angular
    .module('revaluate.expenses')
    .service('ExpenseTransformerService', function (Expense) {

      this.expenseApiRequestTransformer = function (requestData) {

        function buildExpensePayload(data) {
          var newly = _.extend(data, { spentDate: moment(data.spentDate).format('YYYY-MM-DDTHH:mm:ss.hhh') });

          return _.omit(newly, ['modifiedDate', 'createdDate', 'marked']);
        }

        if (_.isArray(requestData)) {
          return _.map(requestData, buildExpensePayload);
        } else {
          return buildExpensePayload(requestData);
        }
      };

      this.expenseApiResponseTransformer = function (responseData) {
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
    });

