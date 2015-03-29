angular
    .module("expenses")
    .controller("ExpenseAutoEditCtrl", function ($scope, $timeout, ExpenseModalService, ExpenseUpdateModalService, expenseToReview) {

        /**
         * Auto open the modal.
         */
        $timeout(function () {
            ExpenseUpdateModalService.open(expenseToReview, -1);
        });

        $scope.openExpenseModalService = function () {
            ExpenseModalService.open();
        };
    });
