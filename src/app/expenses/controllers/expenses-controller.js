(function () {
    'use strict';

    function ExpensesController(EXPENSE_EVENTS, ALERTS_EVENTS, USER_ACTIVITY_EVENTS, ALERTS_CONSTANTS, APP_CONFIG, $scope, $rootScope, $timeout, promiseTracker, ExpenseService, expensesQueryResponse, categories) {

        var vm = this,
            INFINITE_SCROLL_EXPENSES_OFFSET = 50,
            INFINITE_SCROLL_TIMEOUT = 1500;

        /**
         * Alert identifier
         */
        this.alertId = ALERTS_CONSTANTS.expenseList;

        /**
         * The current user
         */
        this.user = $rootScope.currentUser;

        /**
         * Existing categories.
         */
        this.categories = categories;

        /**
         * Expenses query response
         */
        this.expensesQueryResponse = expensesQueryResponse;

        /**
         * Existing expenses.
         */
        this.expenses = this.expensesQueryResponse.groupedExpensesDTOList;

        /**
         * Temporary list of existing expenses.
         */
        this.temporaryExpenses = [];

        /**
         * Create a delete tracker.
         */
        this.bulkDeleteTracker = promiseTracker();

        /**
         * On scroll, load more expenses.
         */
        this.loadMoreExpenses = loadMoreExpenses;

        /**
         * Is enough selected expenses for bulk action
         */
        this.isBulkActionEnabled = isBulkActionEnabled;

        /**
         * Cancels bulk action
         */
        this.cancelBulkAction = cancelBulkAction;

        /**
         * Performs bulk delete action
         */
        this.performBulkDelete = performBulkDelete;

        /**
         * Is no more expenses to be loaded
         */
        this.isNoMoreExpensesToBeLoaded = function () {
            return this.expensesQueryResponse.currentSize === this.expensesQueryResponse.totalSize;
        };

        function loadMoreExpenses() {
            if (vm.isUpdatingListLayout || vm.isNoMoreExpensesToBeLoaded()) {
                return;
            }

            this.isUpdatingListLayout = true;

            ExpenseService
                .getAllExpensesGrouped(0, _.compose(_.flatten, _.map)(vm.expenses, 'expenseDTOs').length + INFINITE_SCROLL_EXPENSES_OFFSET)
                .then(function (response) {
                    vm.expensesQueryResponse = response;
                    vm.expenses = vm.expensesQueryResponse.groupedExpensesDTOList;

                    // ---
                    // We did reload the whole list, therefore get rid of the temporary list.
                    // ---
                    vm.temporaryExpenses = [];
                })
                .finally(function () {
                    $timeout(function () {
                        vm.isUpdatingListLayout = !vm.isUpdatingListLayout;
                    }, INFINITE_SCROLL_TIMEOUT);
                })
        }

        function isBulkActionEnabled() {
            return getSelectedExpensesForBulkAction().length >= APP_CONFIG.MIN_EXPENSES_TO_ENABLE_BULK_ACTION;
        }

        /**
         * Get selected expenses for bulk action (marked===true)
         */
        function getSelectedExpensesForBulkAction() {
            var flatMap = _.compose(_.flatten, _.map),
                expensesJoined = flatMap(vm.expenses, 'expenseDTOs');

            return _.filter(
                _(expensesJoined)
                    .concat(vm.temporaryExpenses)
                    .value(), 'marked', true);
        }

        function cancelBulkAction() {
            var allCurrentlySelected = getSelectedExpensesForBulkAction();

            _.each(allCurrentlySelected, function (currentlySelected) {
                currentlySelected.marked = !currentlySelected.marked;
            });
        }

        function performBulkDelete() {
            var selectedForBulkDelete = angular.copy(getSelectedExpensesForBulkAction());

            // ---
            // Try to save them at once and if successfully, update the user.
            // ---
            ExpenseService
                .bulkDelete(selectedForBulkDelete)
                .then(function () {
                    $rootScope.$broadcast(EXPENSE_EVENTS.isDeleted, { expenses: selectedForBulkDelete });
                })
                .catch(function () {
                    $rootScope.$broadcast(EXPENSE_EVENTS.isErrorOccurred, 'We\'ve encountered an error while trying to perform bulk action.');
                });
        }

        // ---
        // EVENT LISTENERS (listen for events from e.g. entries list).
        // ---

        /**
         * On expense created, display a success message, and add expense to the list.
         */
        $scope.$on(EXPENSE_EVENTS.isCreated, function (event, args) {
            vm.temporaryExpenses.push(args.expense);

            $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.expenseCreated);
            $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Saved');
        });

        /**
         * On expense updated.
         */
        $scope.$on(EXPENSE_EVENTS.isUpdated, function (event, args) {
            var expenseExistsInList = _.some(_.compose(_.flatten, _.map)(vm.expenses, 'expenseDTOs'), 'id', args.expense.id);

            if (expenseExistsInList) {
                removeExpenseFromGroupedExpenses(vm.expenses, args.expense);

            } else {
                _.remove(vm.temporaryExpenses, 'id', args.expense.id);
            }
            vm.temporaryExpenses.push(args.expense);

            $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Updated');
            $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.expenseUpdated);
        });

        /**
         * On expense deleted, display a success message, and remove the expense from the list.
         */
        $scope.$on(EXPENSE_EVENTS.isDeleted, function (event, args) {
            if (args.expenses) {
                removeBulkExpenses(args.expenses);
            }

            $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Deleted');
            $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.expenseDeleted);
        });

        function removeExpenseFromGroupedExpenses(groupedExpenses, expenseToBeRemoved) {
            _.each(groupedExpenses, function (groupedExpenseEntry) {
                _.remove(groupedExpenseEntry.expenseDTOs, 'id', expenseToBeRemoved.id);
            });
        }

        function removeBulkExpenses(selectedForBulkDelete) {
            _.each(selectedForBulkDelete, function (selectedForBulkDeleteEntry) {
                removeExpenseFromGroupedExpenses(vm.expenses, selectedForBulkDeleteEntry);
                _.remove(vm.temporaryExpenses, 'id', selectedForBulkDeleteEntry.id);
            });
        }

        /**
         * On error occurred.
         */
        $scope.$on(EXPENSE_EVENTS.isErrorOccurred, function (event, args) {
            $scope.$emit(ALERTS_EVENTS.DANGER, {
                message: args.errorMessage,
                alertId: $scope.alertId
            });
        });

    }

    angular
        .module('revaluate.expenses')
        .controller('ExpensesController', ExpensesController);
}());
