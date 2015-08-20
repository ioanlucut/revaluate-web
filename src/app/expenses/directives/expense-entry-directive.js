(function () {
    'use strict';

    function ExpenseEntryController(EXPENSE_EVENTS, $rootScope, $scope, Category, promiseTracker) {

        var vm = this,
            MIN_YEAR_TO_CREATE_EXPENSE = 1800;

        /**
         * Current user.
         */
        this.user = $rootScope.currentUser;

        /**
         * Minimum date to create expense.
         */
        this.minDate = moment().year(MIN_YEAR_TO_CREATE_EXPENSE);

        /**
         * Keep the master backup. Work only with shownExpense.
         */
        this.shownExpense = angular.copy(this.expense);

        /**
         * Selected category
         */
        this.category = {};
        this.category.selected = new Category(this.shownExpense.model.category);

        /**
         * We need an object in the scope as this model is changed by the
         * datePicker and we want to see those changes. Remember '.' notation.
         */
        this.datePickerStatus = {};

        /**
         * Max date to create expense
         */
        this.maxDate = moment().hours(0).minutes(0).seconds(0);

        /**
         * Update the expense.
         */
        this.updateExpense = updateExpense;

        /**
         * Toggle mark for bulk action
         */
        this.toggleMark = toggleMark;

        /**
         * Open date picker
         */
        this.openDatePicker = openDatePicker;

        /**
         * Create an updating tracker.
         */
        vm.updateTracker = promiseTracker();

        function updateExpense(expense, category) {
            if (category && category.selected) {
                expense.model.category = angular.copy(category.selected);
            }

            expense
                .save()
                .then(function () {
                    $scope.$emit(EXPENSE_EVENTS.isUpdated, {
                        expense: expense
                    });
                })
                .catch(function () {
                    vm.badPostSubmitResponse = true;
                    $scope.$emit(EXPENSE_EVENTS.isErrorOccurred, 'We\'ve encountered an error while trying to update this expense.');
                });
        }

        function toggleMark() {
            vm.expense.marked = !vm.expense.marked;

            // ---
            // We need this info also in the parent scope, so we synchronize the master too.
            // ---
            vm.shownExpense.marked = vm.expense.marked;
        }

        function openDatePicker($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.datePickerStatus.opened = true;
        }
    }

    angular
        .module('revaluate.expenses')
        .directive('expenseEntry', function (EXPENSE_EVENTS, $rootScope, $timeout) {
            return {
                restrict: 'A',
                scope: {
                    categories: '=',
                    expense: '='
                },
                controller: ExpenseEntryController,
                bindToController: true,
                controllerAs: 'vm',
                templateUrl: '/app/expenses/partials/expense-entry-directive.tpl.html',
                link: function (scope, el, attrs, vm) {
                    var EXPENSE_INPUT_SELECTOR = '.expense__form__price__input';

                    /**
                     * If date details should be shown
                     */
                    scope.showDateDetails = !_.isUndefined(attrs.showDateDetails);

                    /**
                     * Show block content
                     */
                    scope.showContent = false;

                    /**
                     * Toggle content
                     */
                    scope.toggleContent = function () {
                        scope.showContent = !scope.showContent;

                        // ---
                        // Auto focus price.
                        // ---
                        if (scope.showContent) {
                            $timeout(function () {
                                el.find(EXPENSE_INPUT_SELECTOR).focus();
                            });
                        }
                    };

                    /**
                     * Toggle and discard changes.
                     */
                    scope.cancel = function () {
                        scope.toggleContent();

                        vm.shownExpense = angular.copy(vm.expense);
                    };

                    /**
                     * On expense updated/deleted - cancel edit mode.
                     */
                    $rootScope.$on(EXPENSE_EVENTS.isUpdated, function (event, args) {
                        if (vm.expense.model.id === args.expense.model.id) {

                            // ---
                            // Now update the master expense, and remove the marked sign.
                            // ---
                            vm.shownExpense.marked = false;
                            vm.expense = angular.copy(vm.shownExpense);

                            scope.cancel();
                        }
                    });
                }
            }
        });
}());
