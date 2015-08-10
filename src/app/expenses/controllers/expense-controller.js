(function () {
    'use strict';

    angular
        .module('revaluate.expenses')
        .controller('ExpenseController', function (AlertService, $scope, $rootScope, $stateParams, Expense, expensesQueryResponse, ExpenseService, categories, $window, $timeout, StatesHandler, EXPENSE_EVENTS, ALERTS_EVENTS, USER_ACTIVITY_EVENTS, ALERTS_CONSTANTS, APP_CONFIG) {

            var INFINITE_SCROLL_EXPENSES_OFFSET = 50,
                INFINITE_SCROLL_TIMEOUT = 1500;

            /**
             * Alert identifier
             */
            $scope.alertId = ALERTS_CONSTANTS.expenseList;

            /**
             * The current user
             */
            $scope.user = $rootScope.currentUser;

            /**
             * Expenses query response
             */
            $scope.expensesQueryResponse = expensesQueryResponse;

            /**
             * Existing categories.
             */
            $scope.categories = categories;

            /**
             * Existing expenses.
             */
            $scope.expenses = $scope.expensesQueryResponse.groupedExpensesDTOList;

            /**
             * Temporary list of existing expenses.
             */
            $scope.temporaryExpenses = [];

            /**
             * Initialize or reset the state
             */
            $scope.initOrResetAddExpense = function (expenseForm) {

                /**
                 * Keep master expense.
                 */
                $scope.masterExpense = Expense.build({
                    spentDate: moment().toDate()
                });

                /**
                 * Work with a copy of master expense
                 */
                $scope.expense = angular.copy($scope.masterExpense);

                /**
                 * Selected category
                 */
                $scope.category = {};

                if (expenseForm) {
                    expenseForm.$setPristine();
                }

                $scope.badPostSubmitResponse = false;

                /**
                 * Flag which represents whether the save is in progress.
                 */
                $scope.isSaving = false;

                /**
                 * Max date to create expense
                 */
                $scope.datePickerMaxDate = moment().hours(0).minutes(0).seconds(0);
            };

            /**
             * Minimum date to create expense.
             */
            $scope.datePickerMinDate = moment().year(2000);

            /**
             * Perform the first initialization.
             */
            $scope.initOrResetAddExpense();

            /**
             * Open date picker
             */
            $scope.openDatePicker = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.datePickerOpened = true;
            };

            /**
             * Saves the expense.
             */
            $scope.saveExpense = function () {
                var isDateInFuture = moment().diff($scope.expense.model.spentDate || $scope.expenseForm.spentDate) <= 0;
                if ($scope.expenseForm.$valid && !$scope.isSaving) {

                    if (isDateInFuture) {
                        $scope.expenseForm.spentDate.$setValidity('validDate', false);

                        return;
                    }

                    $scope.isSaving = true;

                    $scope.expense.model.category = angular.copy($scope.category.selected.model);
                    angular.copy($scope.expense, $scope.masterExpense);

                    $scope.masterExpense
                        .save()
                        .then(function () {
                            $scope.isSaving = false;
                            $rootScope.$broadcast(EXPENSE_EVENTS.isCreated, { expense: angular.copy($scope.masterExpense) });
                            $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.expenseCreated);

                            $scope.initOrResetAddExpense($scope.expenseForm);
                        })
                        .catch(function () {
                            $scope.badPostSubmitResponse = true;
                            $scope.isSaving = false;
                            $rootScope.$broadcast(EXPENSE_EVENTS.isErrorOccurred, 'We\'ve encountered an error while trying to add this expense.');
                        });
                }
            };

            /**
             * Get selected expenses for bulk action (marked===true)
             */
            function getSelectedExpensesForBulkAction() {
                var flatMap = _.compose(_.flatten, _.map),
                    expensesJoined = flatMap($scope.expenses, 'model.expenseDTOs');

                return _.filter(
                    _(expensesJoined)
                    .concat($scope.temporaryExpenses)
                    .value(), 'marked', true);
            }

            /**
             * Is enough selected expenses for bulk action
             */
            $scope.isBulkActionEnabled = function () {
                return getSelectedExpensesForBulkAction().length >= APP_CONFIG.MIN_EXPENSES_TO_ENABLE_BULK_ACTION;
            };

            /**
             * Cancels bulk action
             */
            $scope.cancelBulkAction = function () {
                var allCurrentlySelected = getSelectedExpensesForBulkAction();

                _.each(allCurrentlySelected, function (currentlySelected) {
                    currentlySelected.marked = !currentlySelected.marked;
                });
            };

            /**
             * Performs bulk delete action
             */
            $scope.performBulkDelete = function () {
                var selectedExpenses = angular.copy(getSelectedExpensesForBulkAction());

                if ($scope.isBulkDeleting) {

                    return;
                }

                // ---
                // Set the deleting flag.
                // ---
                $scope.isBulkDeleting = true;

                // ---
                // Try to save them at once and if successfully, update the user.
                // ---
                ExpenseService
                    .bulkDelete(selectedExpenses)
                    .then(function () {
                        $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.expenseDeleted);

                        removeAllExpenseFrom($scope.expenses, selectedExpenses);
                        $rootScope.$broadcast(EXPENSE_EVENTS.isDeleted, {});
                    })
                    .catch(function () {
                        $scope.cancelBulkAction();
                        $rootScope.$broadcast(EXPENSE_EVENTS.isErrorOccurred, 'We\'ve encountered an error while trying to perform bulk action.');
                    })
                    .finally(function () {
                        $scope.isBulkDeleting = false;
                    })
            };

            /**
             * Is no more expenses to be loaded
             */
            $scope.isNoMoreExpensesToBeLoaded = function () {

                return $scope.expensesQueryResponse.currentSize === $scope.expensesQueryResponse.totalSize;
            };

            /**
             * On scroll, load more expenses.
             */
            $scope.loadMoreExpenses = function () {
                if ($scope.isUpdatingListLayout || $scope.isNoMoreExpensesToBeLoaded()) {
                    return;
                }

                $scope.isUpdatingListLayout = true;

                ExpenseService
                    .getAllExpensesGrouped(0, _.compose(_.flatten, _.map)($scope.expenses, 'model.expenseDTOs').length + INFINITE_SCROLL_EXPENSES_OFFSET)
                    .then(function (response) {
                        $scope.expensesQueryResponse = response;
                        $scope.expenses = $scope.expensesQueryResponse.groupedExpensesDTOList;

                        // ---
                        // We did reload the whole list, therefore get rid of the temporary list.
                        // ---
                        $scope.temporaryExpenses = [];
                    })
                    .finally(function () {
                        $timeout(function () {
                            $scope.isUpdatingListLayout = !$scope.isUpdatingListLayout;
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
                $scope.temporaryExpenses.push(args.expense);

                $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Saved');
            });

            /**
             * On expense updated.
             */
            $scope.$on(EXPENSE_EVENTS.isUpdated, function (event, args) {
                var expenseExistsInList = _.some(_.compose(_.flatten, _.map)($scope.expenses, 'model.expenseDTOs'), 'model.id', args.expense.model.id);

                if (expenseExistsInList) {
                    removeExpenseFromGroupedExpenses($scope.expenses, args.expense);

                } else {
                    _.remove($scope.temporaryExpenses, 'model.id', args.expense.model.id)
                }
                $scope.temporaryExpenses.push(args.expense);

                $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Updated');
            });

            /**
             * On expense deleted, display a success message, and remove the expense from the list.
             */
            $scope.$on(EXPENSE_EVENTS.isDeleted, function (event, args) {
                if (args.expense) {
                    removeExpenseFromGroupedExpenses($scope.expenses, args.expense);
                    _.remove($scope.temporaryExpenses, 'model.id', args.expense.model.id)
                }

                $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Deleted');
            });

            /**
             * On error occurred.
             */
            $scope.$on(EXPENSE_EVENTS.isErrorOccurred, function (event, args) {
                $scope.$emit(ALERTS_EVENTS.DANGER, {
                    message: args.errorMessage,
                    alertId: $scope.alertId
                });

            });

            function removeExpenseFromGroupedExpenses(groupedExpenses, expenseToBeRemoved) {
                _.each(groupedExpenses, function (groupedExpenseEntry) {
                    _.remove(groupedExpenseEntry.model.expenseDTOs, 'model.id', expenseToBeRemoved.model.id);
                });
            }

            /**
             * Remove a list of expenses.
             */
            function removeAllExpenseFrom(expensesGrouped, expensesToBeRemoved) {
                _.each(expensesToBeRemoved, function (expenseToBeRemoved) {
                    removeExpenseFromGroupedExpenses(expensesGrouped, expenseToBeRemoved);
                });
            }

        });
}());
