'use strict';

angular
    .module("revaluate.expenses")
    .controller("ExpenseController", function ($scope, $rootScope, $stateParams, Expense, expenses, ExpenseService, categories, $window, DatesUtils, $timeout, StatesHandler, EXPENSE_EVENTS, flash, MIXPANEL_EVENTS, ALERTS_CONSTANTS) {

        /**
         * Updating/deleting timeout
         */
        var TIMEOUT_DURATION = 300;

        /**
         * Minimum expenses to enable bulk actions
         */
        var MIN_EXPENSES_TO_ENABLE_BULK_ACTION = 1;

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.expenseList;

        /**
         * Search by text
         * @type {string}
         */
        $scope.searchByText = "";

        /**
         * The current user
         * @type {$rootScope.currentUser|*}
         */
        $scope.user = $rootScope.currentUser;

        /**
         * Existing expenses.
         */
        $scope.expenses = expenses;

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

            if ( expenseForm ) {
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
            if ( $scope.expenseForm.$valid && !$scope.isSaving ) {

                var isDateInFuture = moment().diff($scope.expense.model.spentDate || $scope.expenseForm.spentDate) <= 0;
                if ( isDateInFuture ) {
                    $scope.expenseForm.spentDate.$setValidity('validDate', false);

                    return;
                }
                $scope.isSaving = true;

                // Update the  chosen category and master expense.
                $scope.expense.model.category = angular.copy($scope.category.selected.model);
                angular.copy($scope.expense, $scope.masterExpense);

                $scope.masterExpense
                    .save()
                    .then(function () {
                        mixpanel.track(MIXPANEL_EVENTS.expenseCreated);

                        var expenseToBePushed = angular.copy($scope.masterExpense);
                        $timeout(function () {
                            $scope.isSaving = false;
                            $scope.expenses.push(expenseToBePushed);
                        }, TIMEOUT_DURATION);

                        /**
                         * Finally, reset the add form.
                         */
                        $scope.initOrReset($scope.expenseForm);
                    })
                    .catch(function () {

                        flash.to($scope.alertIdentifierId).error = "Could not add expense.";
                        $scope.isSaving = false;
                        $scope.badPostSubmitResponse = true;
                    });
            }
        };

        /**
         * Get selected expenses for bulk action (marked===true)
         * @returns {Array.<T>}
         */
        function getSelectedExpensesForBulkAction() {
            return _.filter($scope.expenses, 'marked', true);
        }

        /**
         * Is enough selected expenses for bulk action
         */
        $scope.isBulkActionEnabled = function () {
            return getSelectedExpensesForBulkAction().length >= MIN_EXPENSES_TO_ENABLE_BULK_ACTION;
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
            if ( $scope.isBulkDeleting ) {

                return;
            }

            var selectedExpenses = angular.copy(getSelectedExpensesForBulkAction());

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
                    /**
                     * Track event.
                     */
                    mixpanel.track(MIXPANEL_EVENTS.expenseDeleted);

                    $timeout(function () {
                        removeAllExpenseFrom($scope.expenses, selectedExpenses);
                        $scope.isBulkDeleting = false;
                    }, TIMEOUT_DURATION);
                })
                .catch(function () {

                    // Error
                    $scope.isBulkDeleting = false;
                    flash.to($scope.alertIdentifierId).error = "Could not perform bulk action.";
                });
        };

        // ---
        // EVENT LISTENERS (listen for events from e.g. entries list).
        // ---

        /**
         * On expense created, display a success message, and add expense to the list.
         */
        $scope.$on(EXPENSE_EVENTS.isCreated, function (event, args) {
            $scope.expenses.push(args.expense);

            flash.to($scope.alertIdentifierId).success = "Expense successfully saved!";
        });

        /**
         * On expense updated.
         */
        $scope.$on(EXPENSE_EVENTS.isUpdated, function (event, args) {
            var result = _.some($scope.expenses, function (topic) {
                return topic.model.id === args.expense.model.id;
            });

            if ( result ) {
                removeExpenseFrom($scope.expenses, args.expense);
                $scope.expenses.push(args.expense);
            }

            flash.to($scope.alertIdentifierId).success = "Expense successfully updated!";
        });

        /**
         * On expense deleted, display a success message, and remove the expense from the list.
         */
        $scope.$on(EXPENSE_EVENTS.isDeleted, function (event, args) {
            removeExpenseFrom($scope.expenses, args.expense);

            flash.to($scope.alertIdentifierId).success = "Expense successfully deleted!";
        });

        /**
         * On error occurred.
         */
        $scope.$on(EXPENSE_EVENTS.isErrorOccurred, function () {

            flash.to($scope.alertIdentifierId).error = "Error occurred!";
        });

        /**
         * Removes given expense from the list.
         */
        function removeExpenseFrom(expenseList, expenseToBeRemoved) {
            return _.remove(expenseList, function (expenseFromArray) {
                var expenseId = _.parseInt(expenseToBeRemoved.model.id, 10);
                var expenseFromArrayId = _.parseInt(expenseFromArray.model.id, 10);
                if ( _.isNaN(expenseFromArrayId) || _.isNaN(expenseId) ) {
                    return false;
                }

                return expenseFromArrayId === expenseId;
            });
        }

        /**
         * Remove a list of expenses from given existing list.
         */
        function removeAllExpenseFrom(expenseList, expensesToBeRemoved) {
            _.each(expensesToBeRemoved, function (expenseToBeRemoved) {
                removeExpenseFrom(expenseList, expenseToBeRemoved);
            });
        }

    });
