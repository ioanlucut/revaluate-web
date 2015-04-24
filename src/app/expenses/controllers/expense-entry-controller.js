angular
    .module("expenses")
    .controller("ExpenseEntryController", function ($scope, $rootScope, Expense, $timeout, EXPENSE_EVENTS, MIXPANEL_EVENTS) {

        /**
         * Minimum date to create expense.
         * @type {Date}
         */
        $scope.minDate = moment().year(2000);

        /**
         * Edit/update timeout
         */
        const TIMEOUT_DURATION = 300;

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
                if ( category && category.originalObject ) {
                    expense.model.category = angular.copy(category.originalObject.model);
                }

                expense
                    .save()
                    .then(function () {

                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.expenseCreated);

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
