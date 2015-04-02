/**
 * Expenses controller.
 */
angular
    .module("expenses")
    .controller("ExpenseListCtrl", function ($scope, $rootScope, flash, ExpenseDeleteModalService, ExpenseModalService, ExpenseUpdateModalService, ExpenseGroupService, ExpenseMatchingGroupService, EXPENSE_EVENTS, $timeout, pastAndUpcomingExpenses, MIXPANEL_EVENTS, ALERTS_CONSTANTS) {

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
         * Search by text
         * @type {string}
         */
        $scope.searchByText = "";

        $scope.openExpenseModalService = function () {
            ExpenseModalService.open();
        };

        /**
         * Upcoming expenses
         */
        $scope.upcomingExpenses = pastAndUpcomingExpenses.upcomingExpenses;
        ExpenseMatchingGroupService.populateExpensesWithMatchingGroups($scope.upcomingExpenses, false);

        /**
         * Past expenses
         */
        $scope.pastExpenses = pastAndUpcomingExpenses.pastExpenses;
        ExpenseMatchingGroupService.populateExpensesWithMatchingGroups($scope.pastExpenses, true);

        /**
         * Expenses tabs.
         */
        $scope.expenseTabs = {
            upcomingExpensesTabActive: true,
            pastExpensesTabActive: false,

            /**
             * Set upcoming tab active.
             */
            setUpcomingExpensesTabActive: function () {
                this.upcomingExpensesTabActive = true;
                this.pastExpensesTabActive = false;
            }
        };

        /**
         * On expense created, display a success message, and add expense to the list.
         */
        $scope.$on(EXPENSE_EVENTS.isCreated, function (event, args) {
            ExpenseMatchingGroupService.populateExpenseWithMatchingGroup(args.expense, false);
            $scope.upcomingExpenses.push(args.expense);
            $scope.expenseTabs.setUpcomingExpensesTabActive();
        });

        /**
         * On expense updated.
         */
        $scope.$on(EXPENSE_EVENTS.isUpdated, function (event, args) {
            ExpenseMatchingGroupService.populateExpenseWithMatchingGroup(args.expense, false);

            var result = _.some($scope.pastExpenses, function (topic) {
                return topic.model.expenseId === args.expense.model.expenseId;
            });

            if ( result ) {
                removeExpenseFrom($scope.pastExpenses, args.expense);
                $scope.upcomingExpenses.push(args.expense);

                $scope.expenseTabs.setUpcomingExpensesTabActive();
            }

        });

        /**
         * On expense deleted, display a success message, and remove the expense from the list.
         */
        $scope.$on(EXPENSE_EVENTS.isDeleted, function (event, args) {
            $timeout(function () {
                removeExpenseFrom($scope.upcomingExpenses, args.expense);
                removeExpenseFrom($scope.pastExpenses, args.expense);
            });
        });

        /**
         * On expense un subscribed, display a success message, and remove the expense from the list.
         */
        $scope.$on(EXPENSE_EVENTS.isUnSubscribed, function (event, args) {
            $timeout(function () {
                removeExpenseFrom($scope.upcomingExpenses, args.expense);
                removeExpenseFrom($scope.pastExpenses, args.expense);
            });
        });

        /**
         * Removes given expense from the list.
         * @param expenseList
         * @param expenseToBeRemoved
         */
        function removeExpenseFrom(expenseList, expenseToBeRemoved) {
            return _.remove(expenseList, function (expenseFromArray) {
                var expenseId = _.parseInt(expenseToBeRemoved.model.expenseId, 10);
                var expenseFromArrayId = _.parseInt(expenseFromArray.model.expenseId, 10);
                if ( _.isNaN(expenseFromArrayId) || _.isNaN(expenseId) ) {
                    return false;
                }

                return expenseFromArrayId === expenseId;
            });
        }
    });