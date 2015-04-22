angular
    .module("expenses")
    .controller("ExpenseEntryController", function ($scope, $rootScope, Expense, $timeout, EXPENSE_EVENTS, MIXPANEL_EVENTS) {

        /**
         * Edit/update timeout
         */
        const TIMEOUT_DURATION = 300;

        /**
         * Selected category
         * @type {{}}
         */
        $scope.category = {};

        /**
         * Update the expense.
         */
        $scope.updateExpense = function (expenseForm, expense) {
            if ( expenseForm.$valid && !$scope.isUpdating ) {

                // Is saving expense
                $scope.isUpdating = true;

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
                        $scope.isUpdating = false;
                        $scope.badPostSubmitResponse = true;
                        $rootScope.$broadcast(EXPENSE_EVENTS.isErrorOccurred, {});
                    });
            }
        };

    });
