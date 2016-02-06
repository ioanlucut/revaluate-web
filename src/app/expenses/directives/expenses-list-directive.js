'use strict';

function ExpenseListController() {
}

export default angular
    .module('revaluate.expenses')
    .directive('expensesList', function () {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                expenses: '=',
                categories: '='
            },
            controller: ExpenseListController,
            bindToController: true,
            controllerAs: 'vm',
            templateUrl: '/app/expenses/partials/expenses-list-directive.tpl.html',
            link: function (scope, el, attrs) {

                scope.reverseOrder = attrs.sort === 'desc';
            }
        };
    })
    .name;
