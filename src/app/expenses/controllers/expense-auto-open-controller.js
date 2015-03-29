angular
    .module("expenses")
    .controller("ExpenseAutoOpenCtrl", function ($scope, $timeout, ExpenseModalService) {

        /**
         * Auto open the modal.
         */
        $timeout(function () {
            ExpenseModalService.open();
        });

        $scope.openExpenseModalService = function () {
            ExpenseModalService.open();
        };
    });
