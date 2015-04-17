/**
 * Expenses controller.
 */
angular
    .module("expenses")
    .controller("ExpenseListCtrl", function ($scope, $rootScope, flash, EXPENSE_EVENTS, $timeout, expenses, categories, MIXPANEL_EVENTS, ALERTS_CONSTANTS) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.expenseList;

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.expensesPage);

        /**
         * The current user
         * @type {$rootScope.currentUser|*}
         */
        $scope.user = $rootScope.currentUser;

        /**
         * Existing categories.
         */
        $scope.categories = categories;

        /**
         * Existing expenses.
         */
        $scope.expenses = expenses;

        // gives another movie array on change
        $scope.updateCategories = function (typed) {
        };

        /**
         * Search by text
         * @type {string}
         */
        $scope.searchByText = "";

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };
    });