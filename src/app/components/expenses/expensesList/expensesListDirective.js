export default

  function ExpenseListController() {
  }

  angular
    .module('revaluate.expenses')
    .directive('expensesList', function () {
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
    });

