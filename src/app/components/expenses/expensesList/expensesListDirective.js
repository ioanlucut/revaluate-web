function ExpenseListController() {
}

function expensesListDirective() {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      expenses: '=',
      categories: '=',
    },
    controller: ExpenseListController,
    bindToController: true,
    controllerAs: 'vm',
    templateUrl: '/app/components/expenses/expensesList/expensesListDirective.tpl.html',
    link: function (scope, el, attrs) {

      scope.reverseOrder = attrs.sort === 'desc';
    },
  };
}

export default expensesListDirective;
