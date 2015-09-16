(function () {
    'use strict';

    function MonthlyGoalsController(EXPENSE_EVENTS, ALERTS_EVENTS, USER_ACTIVITY_EVENTS, $scope, DatesUtils, promiseTracker, GoalService, monthsPerYearsStatisticsGoals, monthsPerYearsStatisticsExpenses, goals) {
        var vm = this;

        /**
         * Load insights
         */
        vm.loadGoals = loadGoals;

        /**
         * Goals months per years statistics
         */
        vm.monthsPerYearsStatisticsGoals = monthsPerYearsStatisticsGoals;

        /**
         * Expenses months per years statistics
         */
        vm.monthsPerYearsStatisticsExpenses = monthsPerYearsStatisticsExpenses;

        /**
         * Goals of this month
         */
        vm.goals = goals;

        /**
         * Create a loading tracker.
         */
        vm.loadTracker = promiseTracker();

        /**
         * Load goals
         */
        function loadGoals() {
            var period = DatesUtils
                .fromLastMonthsToNow(1);

            GoalService
                .getAllGoalsFromTo(period.from, period.to, vm.loadTracker)
                .then(function (receivedGoals) {
                    vm.goals = receivedGoals;

                    $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.goalsFetched);
                })
                .catch(function () {
                    vm.badPostSubmitResponse = true;
                    $scope.$emit(ALERTS_EVENTS.DANGER, {
                        message: 'Could not fetch goals.',
                        alertId: vm.alertId
                    });
                });
        }

        // ---
        // Reload if necessary upon delete/update/create..
        // ---

        $scope.$on(EXPENSE_EVENTS.isCreated, function (event, args) {
            tryToReloadIfNecessary(args);
        });
        $scope.$on(EXPENSE_EVENTS.isDeleted, function (event, args) {
            tryToReloadIfNecessary(args);
        });
        $scope.$on(EXPENSE_EVENTS.isUpdated, function (event, args) {
            tryToReloadIfNecessary(args);
        });

        function tryToReloadIfNecessary(args) {
            if (args.expense) {
                reloadIfRequired(args.expense);
            } else if (args.expenses) {
                _.each(args.expenses, function (expenseCandidate) {
                    reloadIfRequired(expenseCandidate);
                });
            }
        }

        function reloadIfRequired(expense) {
            var isSameMonth = moment().isSame(moment(expense.spentDate), 'month');

            if (isSameMonth) {
                vm.loadGoals();
            }
        }
    }

    angular
        .module('revaluate.expenses')
        .controller('MonthlyGoalsController', MonthlyGoalsController);
}());
