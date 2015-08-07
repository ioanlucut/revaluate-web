(function () {
    'use strict';

    angular
        .module('revaluate.expenses')
        .controller('ExpenseController', function (AlertService, $scope, $rootScope, $stateParams, Expense, expensesQueryResponse, ExpenseService, categories, $window, $timeout, StatesHandler, EXPENSE_EVENTS, ALERTS_EVENTS, USER_ACTIVITY_EVENTS, ALERTS_CONSTANTS, APP_CONFIG) {

            var OFFSET = 50;

            /**
             * Alert identifier
             */
            $scope.alertId = ALERTS_CONSTANTS.expenseList;

            /**
             * Search by text
             * @type {string}
             */
            $scope.searchByText = '';

            /**
             * The current user
             * @type {$rootScope.currentUser|*}
             */
            $scope.user = $rootScope.currentUser;

            /**
             * Expenses query response
             */
            $scope.expensesQueryResponse = expensesQueryResponse;

            /**
             * Existing expenses.
             */
            $scope.expenses = $scope.expensesQueryResponse.groupedExpensesDTOList;

            /**
             * Temporary list of existing expenses.
             */
            $scope.temporaryExpenses = [];

            /**
             * Existing categories.
             */
            $scope.categories = categories;

            /**
             * Initialize or reset the state
             */
            $scope.initOrReset = function (expenseForm) {

                /**
                 * Keep master expense.
                 * @type {XMLList|XML|*}
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
                 * @type {{}}
                 */
                $scope.category = {};

                if (expenseForm) {
                    expenseForm.$setPristine();
                }

                $scope.badPostSubmitResponse = false;

                /**
                 * Flag which represents whether the save is in progress.
                 * @type {boolean}
                 */
                $scope.isSaving = false;

                /**
                 * Max date to create expense
                 */
                $scope.datePickerMaxDate = moment().hours(0).minutes(0).seconds(0);
            };

            /**
             * Minimum date to create expense.
             * @type {Date}
             */
            $scope.datePickerMinDate = moment().year(2000);

            /**
             * Perform the first initialization.
             */
            $scope.initOrReset();

            /**
             * Open date picker
             * @param $event
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

                    // Update the chosen category and master expense.
                    $scope.expense.model.category = angular.copy($scope.category.selected.model);
                    angular.copy($scope.expense, $scope.masterExpense);

                    $scope.masterExpense
                        .save()
                        .then(function () {
                            $scope.isSaving = false;
                            $rootScope.$broadcast(EXPENSE_EVENTS.isCreated, { expense: angular.copy($scope.masterExpense) });
                            $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.expenseCreated);

                            $scope.initOrReset($scope.expenseForm);
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
             * @returns {Array.<T>}
             */
            function getSelectedExpensesForBulkAction() {
                return _.filter(_.compose(_.flatten, _.map)($scope.expenses, 'model.expenseDTOs'), 'marked', true);
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
                        $scope.isBulkDeleting = false;
                        $rootScope.$broadcast(EXPENSE_EVENTS.isDeleted, {});
                    })
                    .catch(function () {
                        $scope.isBulkDeleting = false;
                        $scope.cancelBulkAction();
                        $rootScope.$broadcast(EXPENSE_EVENTS.isErrorOccurred, 'We\'ve encountered an error while trying to perform bulk action.');
                    });
            };

            /**
             * On scroll.
             */
            $scope.loadMore = function () {
                if ($scope.isUpdatingListLayout) {
                    return;
                }

                $scope.isUpdatingListLayout = true;

                ExpenseService
                    .getAllExpensesGrouped(0, _.compose(_.flatten, _.map)($scope.expenses, 'model.expenseDTOs').length + OFFSET)
                    .then(function (response) {

                        $scope.expensesQueryResponse = response;
                        $scope.expenses = $scope.expensesQueryResponse.groupedExpensesDTOList;
                    })
                    .finally(function () {
                        $scope.isUpdatingListLayout = false;
                    })
            };

            // ---
            // EVENT LISTENERS (listen for events from e.g. entries list).
            // ---

            /**
             * On expense created, display a success message, and add expense to the list.
             */
            $scope.$on(EXPENSE_EVENTS.isCreated, function (event, args) {
                $scope.expenses.push(args.expense);

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
