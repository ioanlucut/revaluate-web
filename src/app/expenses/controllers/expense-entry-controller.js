'use strict';

angular
    .module("revaluate.expenses")
    .controller("ExpenseEntryController", function ($scope, $rootScope, Expense, $timeout, EXPENSE_EVENTS, USER_ACTIVITY_EVENTS) {

        /**
         * Edit/update timeout
         */
        var TIMEOUT_DURATION = 300;
        var MIN_YEAR_TO_CREATE_EXPENSE = 1800;

        /**
         * Minimum date to create expense.
         * @type {Date}
         */
        $scope.minDate = moment().year(MIN_YEAR_TO_CREATE_EXPENSE);

        /**
         * Update the expense.
         */
        $scope.updateExpense = function (expenseForm, expense, category) {
            if ( expenseForm.$valid && !$scope.isUpdating ) {

                var isDateInFuture = moment().diff(expense.model.spentDate || expenseForm.spentDate) <= 0;
                if ( isDateInFuture ) {
                    expenseForm.spentDate.$setValidity('validDate', false);

                    return;
                }

                // Is saving expense
                $scope.isUpdating = true;

                // Update the chosen category - if defined
                if ( category && category.selected ) {
                    expense.model.category = angular.copy(category.selected.model);
                }

                expense
                    .save()
                    .then(function () {
                        $rootScope.$broadcast("trackEvent", USER_ACTIVITY_EVENTS.expenseUpdated);

                        $timeout(function () {
                            $scope.isUpdating = false;

                            $rootScope.$broadcast(EXPENSE_EVENTS.isUpdated, {
                                expense: expense
                            });
                        }, TIMEOUT_DURATION);
                    })
                    .catch(function () {
                        $scope.badPostSubmitResponse = true;
                        $scope.isUpdating = false;
                        $rootScope.$broadcast(EXPENSE_EVENTS.isErrorOccurred, {
                            errorMessage: "We've encountered an error while trying to update this expense."
                        });
                    });
            }
        };
    });
