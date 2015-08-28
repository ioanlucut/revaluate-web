(function () {
    'use strict';

    function ExpenseListController($rootScope, $timeout) {
        var vm = this,
            TIMEOUT = 200;

        /**
         * Initial selected order by
         */
        this.selectedOrderBy = 'createdDate';

        /**
         * Sets the selected order by
         */
        this.setSelectedOrderBy = setSelectedOrderBy;

        /**
         * Is loading more expenses flag.
         */
        this.isUpdatingListLayout = false;

        function setSelectedOrderBy(by) {
            vm.isUpdatingListLayout = !vm.isUpdatingListLayout;

            $timeout(function () {
                vm.selectedOrderBy = by;
                vm.isUpdatingListLayout = !vm.isUpdatingListLayout;
            }, TIMEOUT);
        }
    }

    angular
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
        });
}());
