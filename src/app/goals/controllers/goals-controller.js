(function () {
    'use strict';

    function GoalsController(GOAL_EVENTS, ALERTS_EVENTS, USER_ACTIVITY_EVENTS, ALERTS_CONSTANTS, $scope, $rootScope, StatisticService, DatesUtils, promiseTracker, GoalService, monthsPerYearsStatistics, goals, categories) {

        var vm = this;

        /**
         * Alert identifier
         */
        this.alertId = ALERTS_CONSTANTS.goalList;

        /**
         * The current user
         */
        this.user = $rootScope.currentUser;

        /**
         * Existing categories.
         */
        this.categories = categories;

        /**
         * Existing goals.
         */
        this.goals = goals;

        /**
         * Insights months per years.
         */
        this.monthsPerYearsStatistics = monthsPerYearsStatistics;

        /**
         * Exposed goals data.
         */
        vm.goalsData = {
            yearMonthDate: moment().toDate()
        };

        /**
         * On date change do load goals
         */
        vm.loadGoals = loadGoals;

        /**
         * Create a saving tracker.
         */
        vm.loadTracker = promiseTracker();

        /**
         * Create a saving tracker.
         */
        vm.updateStatisticsTracker = promiseTracker();

        /**
         * Is maximum number of allowed goals exceeded. Depends on the type of user.
         */
        vm.isMaximumNumberOfAllowedGoalsExceeded = isMaximumNumberOfAllowedGoalsExceeded;

        /**
         * Load goals
         */
        function loadGoals(yearMonthDate) {
            var period;

            if (vm.loadTracker.active()) {

                return;
            }

            period = DatesUtils
                .getFromToOfMonthYear(yearMonthDate);

            GoalService
                .getAllGoalsFromTo(period.from, period.to, vm.loadTracker)
                .then(function (receivedGoals) {
                    vm.goals = receivedGoals;

                    // ---
                    // If there was a previously error, just clear it.
                    // ---
                    $scope.$emit(ALERTS_EVENTS.CLEAR, {
                        alertId: vm.alertId
                    });
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

        function isMaximumNumberOfAllowedGoalsExceeded() {
            return vm.goals.length >= vm.categories.length;
        }

        function reloadMonthsPerYearsStatistics() {
            StatisticService
                .fetchGoalsMonthsPerYearStatistics(vm.updateStatisticsTracker)
                .then(function (receivedMonthsPerYearsStatistics) {
                    vm.monthsPerYearsStatistics = receivedMonthsPerYearsStatistics;
                });
        }

        // ---
        // EVENT LISTENERS (listen for events from e.g. entries list).
        // ---

        /**
         * On goal created, display a success message, and add goal to the list.
         */
        $scope.$on(GOAL_EVENTS.isCreated, function (event, args) {
            var isSameMonth = moment(vm.goalsData.yearMonthDate).isSame(moment(args.goal.yearMonthDate), 'month');

            if (isSameMonth) {
                vm.goals.push(args.goal);
            } else {
                reloadMonthsPerYearsStatistics();
            }

            $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.goalCreated);
            $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Saved');
        });

        /**
         * On goal updated.
         */
        $scope.$on(GOAL_EVENTS.isUpdated, function (event, args) {
            reloadMonthsPerYearsStatistics();

            _.remove(vm.goals, 'id', args.goal.id);
            vm.goals.push(args.goal);

            $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Updated');
            $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.goalUpdated);
        });

        /**
         * On goal deleted, display a success message, and remove the goal from the list.
         */
        $scope.$on(GOAL_EVENTS.isDeleted, function (event, args) {
            if (args.goal) {
                _.remove(vm.goals, 'id', args.goal.id);
                reloadMonthsPerYearsStatistics();
            }

            $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Deleted');
            $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.goalDeleted);
        });

        /**
         * On error occurred.
         */
        $scope.$on(GOAL_EVENTS.isErrorOccurred, function (event, args) {
            $scope.$emit(ALERTS_EVENTS.DANGER, {
                message: args.errorMessage,
                alertId: $scope.alertId
            });
        });

    }

    angular
        .module('revaluate.goals')
        .controller('GoalsController', GoalsController);
}());
