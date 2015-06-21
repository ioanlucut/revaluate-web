'use strict';

angular
    .module("revaluate.expenses")
    .controller("ExpenseEntryController", function ($scope, $rootScope, Expense, $timeout, EXPENSE_EVENTS, MIXPANEL_EVENTS) {

        /**
         * Edit/update timeout
         */
        var TIMEOUT_DURATION = 300;

        /**
         * Minimum date to create expense.
         * @type {Date}
         */
        $scope.minDate = moment().year(2000);

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

                // Update the  chosen category - if defined
                if ( category && category.selected ) {
                    expense.model.category = angular.copy(category.selected.model);
                }

                expense
                    .save()
                    .then(function () {
                        mixpanel.track(MIXPANEL_EVENTS.expenseUpdated);

                        $timeout(function () {
                            $scope.isUpdating = false;

                            $rootScope.$broadcast(EXPENSE_EVENTS.isUpdated, {
                                expense: expense
                            });
                        }, TIMEOUT_DURATION);
                    })
                    .catch(function () {

                        // Error
                        $scope.category = {};
                        $scope.isUpdating = false;
                        $scope.badPostSubmitResponse = true;
                        $rootScope.$broadcast(EXPENSE_EVENTS.isErrorOccurred, {});
                    });
            }
        };
    });
