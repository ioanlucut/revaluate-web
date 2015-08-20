(function () {
    'use strict';

    function AddExpenseController(EXPENSE_EVENTS, $scope, Expense, promiseTracker) {

        var vm = this,
            MIN_DATE = 2000;

        /**
         * Create a saving tracker.
         */
        this.saveTracker = promiseTracker();

        this.initOrResetAddExpense = initOrResetAddExpense;

        this.saveExpense = saveExpense;

        /**
         * Open date picker
         */
        this.openDatePicker = openDatePicker;

        /**
         * Minimum date to create expense.
         */
        this.datePickerMinDate = moment().year(MIN_DATE);

        /**
         * Perform the first initialization.
         */
        this.initOrResetAddExpense();

        function initOrResetAddExpense() {

            /**
             * Keep master expense.
             */
            vm.masterExpense = Expense.build({
                spentDate: moment().toDate()
            });

            /**
             * Work with a copy of master expense
             */
            vm.expense = angular.copy(vm.masterExpense);

            /**
             * Selected category
             */
            vm.category = {};

            if (vm.expenseForm) {
                vm.expenseForm.$setPristine();
            }

            vm.badPostSubmitResponse = false;

            /**
             * Max date to create expense
             */
            vm.datePickerMaxDate = moment().hours(0).minutes(0).seconds(0);
        }

        function saveExpense() {
            this.expense.model.category = angular.copy(this.category.selected);
            angular.copy(this.expense, this.masterExpense);

            this.masterExpense
                .save()
                .then(function () {
                    $scope.$emit(EXPENSE_EVENTS.isCreated, { expense: angular.copy(vm.masterExpense) });
                    vm.initOrResetAddExpense();
                })
                .catch(function () {
                    vm.badPostSubmitResponse = true;
                    $scope.$emit(EXPENSE_EVENTS.isErrorOccurred, 'We\'ve encountered an error while trying to add this expense.');
                });
        }

        function openDatePicker($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.datePickerOpened = true;
        }

    }

    angular
        .module('revaluate.expenses')
        .directive('expenseAdd', function () {
            return {
                restrict: 'A',
                scope: {
                    categories: '='
                },
                controller: AddExpenseController,
                bindToController: true,
                controllerAs: 'vm',
                templateUrl: '/app/expenses/partials/expense-add-directive.tpl.html',
                link: function () {
                }
            }
        });
}());
