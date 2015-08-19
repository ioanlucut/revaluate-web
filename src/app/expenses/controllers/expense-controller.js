(function () {
    'use strict';

    angular
        .module('revaluate.expenses')
        .controller('ExpenseController', function ($scope, $rootScope, $stateParams, AlertService, Expense, ExpenseService, StatesHandler, expensesQueryResponse, categories, $window, $timeout, EXPENSE_EVENTS, ALERTS_EVENTS, USER_ACTIVITY_EVENTS, ALERTS_CONSTANTS, APP_CONFIG) {


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
             * Expenses query response
             */
            this.expensesQueryResponse = expensesQueryResponse;

            /**
             * Existing categories.
             */
            this.categories = categories;

            /**
             * Existing expenses.
             */
            this.expenses = this.expensesQueryResponse.groupedExpensesDTOList;

            /**
             * Temporary list of existing expenses.
             */
            this.temporaryExpenses = [];

            /**
             * Initialize or reset the state
             */
            this.initOrResetAddExpense = function (expenseForm) {

                /**
                 * Keep master expense.
                 */
                this.masterExpense = Expense.build({
                    spentDate: moment().toDate()
                });

                /**
                 * Work with a copy of master expense
                 */
                this.expense = angular.copy(this.masterExpense);

                /**
                 * Selected category
                 */
                this.category = {};

                if (expenseForm) {
                    expenseForm.$setPristine();
                }

                this.badPostSubmitResponse = false;

                /**
                 * Flag which represents whether the save is in progress.
                 */
                this.isSaving = false;

                /**
                 * Max date to create expense
                 */
                this.datePickerMaxDate = moment().hours(0).minutes(0).seconds(0);
            };

            /**
             * Minimum date to create expense.
             */
            this.datePickerMinDate = moment().year(2000);

            /**
             * Perform the first initialization.
             */
            this.initOrResetAddExpense();

            /**
             * Open date picker
             */
            this.openDatePicker = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                this.datePickerOpened = true;
            };

            /**
             * Saves the expense.
             */
            this.saveExpense = function () {
                if (this.expenseForm.$valid && !this.isSaving) {

                    this.isSaving = true;

                    this.expense.model.category = angular.copy(this.category.selected);
                    angular.copy(this.expense, this.masterExpense);

                    this.masterExpense
                        .save()
                        .then(function () {
                            vm.isSaving = false;
                            $rootScope.$broadcast(EXPENSE_EVENTS.isCreated, { expense: angular.copy(vm.masterExpense) });
                            $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.expenseCreated);

                            vm.initOrResetAddExpense(vm.expenseForm);
                        })
                        .catch(function () {
                            vm.badPostSubmitResponse = true;
                            vm.isSaving = false;
                            $rootScope.$broadcast(EXPENSE_EVENTS.isErrorOccurred, 'We\'ve encountered an error while trying to add this expense.');
                        });
                }
            };

            /**
             * Get selected expenses for bulk action (marked===true)
             */
            function getSelectedExpensesForBulkAction() {
                var flatMap = _.compose(_.flatten, _.map),
                    expensesJoined = flatMap(vm.expenses, 'model.expenseDTOs');

                return _.filter(
                    _(expensesJoined)
                        .concat(vm.temporaryExpenses)
                        .value(), 'marked', true);
            }

            /**
             * Is enough selected expenses for bulk action
             */
            this.isBulkActionEnabled = function () {
                return getSelectedExpensesForBulkAction().length >= APP_CONFIG.MIN_EXPENSES_TO_ENABLE_BULK_ACTION;
            };

            /**
             * Cancels bulk action
             */
            this.cancelBulkAction = function () {
                var allCurrentlySelected = getSelectedExpensesForBulkAction();

                _.each(allCurrentlySelected, function (currentlySelected) {
                    currentlySelected.marked = !currentlySelected.marked;
                });
            };

            /**
             * Performs bulk delete action
             */
            this.performBulkDelete = function () {
                var selectedForBulkDelete = angular.copy(getSelectedExpensesForBulkAction());

                if (this.isBulkDeleting) {

                    return;
                }

                // ---
                // Set the deleting flag.
                // ---
                this.isBulkDeleting = true;

                // ---
                // Try to save them at once and if successfully, update the user.
                // ---
                ExpenseService
                    .bulkDelete(selectedForBulkDelete)
                    .then(function () {
                        $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.expenseDeleted);

                        $rootScope.$broadcast(EXPENSE_EVENTS.isDeleted, { expenses: selectedForBulkDelete });
                    })
                    .catch(function () {
                        vm.cancelBulkAction();
                        $rootScope.$broadcast(EXPENSE_EVENTS.isErrorOccurred, 'We\'ve encountered an error while trying to perform bulk action.');
                    })
                    .finally(function () {
                        vm.isBulkDeleting = false;
                    })
            };

            /**
             * Is no more expenses to be loaded
             */
            this.isNoMoreExpensesToBeLoaded = function () {

                return this.expensesQueryResponse.currentSize === this.expensesQueryResponse.totalSize;
            };

            /**
             * On scroll, load more expenses.
             */
            this.loadMoreExpenses = function () {
                if (this.isUpdatingListLayout || this.isNoMoreExpensesToBeLoaded()) {
                    return;
                }

                this.isUpdatingListLayout = true;

                ExpenseService
                    .getAllExpensesGrouped(0, _.compose(_.flatten, _.map)(this.expenses, 'model.expenseDTOs').length + INFINITE_SCROLL_EXPENSES_OFFSET)
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
            };

            // ---
            // EVENT LISTENERS (listen for events from e.g. entries list).
            // ---

            /**
             * On expense created, display a success message, and add expense to the list.
             */
            $scope.$on(EXPENSE_EVENTS.isCreated, function (event, args) {
                vm.temporaryExpenses.push(args.expense);

                $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Saved');
            });

            /**
             * On expense updated.
             */
            $scope.$on(EXPENSE_EVENTS.isUpdated, function (event, args) {
                var expenseExistsInList = _.some(_.compose(_.flatten, _.map)(vm.expenses, 'model.expenseDTOs'), 'model.id', args.expense.model.id);

                if (expenseExistsInList) {
                    removeExpenseFromGroupedExpenses(vm.expenses, args.expense);

                } else {
                    _.remove(vm.temporaryExpenses, 'model.id', args.expense.model.id);
                }
                vm.temporaryExpenses.push(args.expense);

                $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Updated');
            });

            /**
             * On expense deleted, display a success message, and remove the expense from the list.
             */
            $scope.$on(EXPENSE_EVENTS.isDeleted, function (event, args) {
                if (args.expenses) {
                    removeBulkExpenses(args.expenses);
                }

                $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Deleted');
            });

            function removeExpenseFromGroupedExpenses(groupedExpenses, expenseToBeRemoved) {
                _.each(groupedExpenses, function (groupedExpenseEntry) {
                    _.remove(groupedExpenseEntry.model.expenseDTOs, 'model.id', expenseToBeRemoved.model.id);
                });
            }

            function removeBulkExpenses(selectedForBulkDelete) {
                _.each(selectedForBulkDelete, function (selectedForBulkDeleteEntry) {
                    removeExpenseFromGroupedExpenses(vm.expenses, selectedForBulkDeleteEntry);
                    _.remove(vm.temporaryExpenses, 'model.id', selectedForBulkDeleteEntry.model.id);
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

        });
}());
