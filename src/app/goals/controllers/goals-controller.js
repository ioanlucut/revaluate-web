(function () {
    'use strict';

    function GoalsController(GOAL_EVENTS, ALERTS_EVENTS, USER_ACTIVITY_EVENTS, ALERTS_CONSTANTS, APP_CONFIG, $scope, $rootScope, DatesUtils, promiseTracker, GoalService, monthsPerYearsStatistics, goals, categories) {

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
         * Create a delete tracker.
         */
        this.bulkDeleteTracker = promiseTracker();

        /**
         * Is enough selected goals for bulk action
         */
        this.isBulkActionEnabled = isBulkActionEnabled;

        /**
         * Cancels bulk action
         */
        this.cancelBulkAction = cancelBulkAction;

        /**
         * Performs bulk delete action
         */
        this.performBulkDelete = performBulkDelete;

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

        function isBulkActionEnabled() {
            return getSelectedGoalsForBulkAction().length >= APP_CONFIG.MIN_GOALS_TO_ENABLE_BULK_ACTION;
        }

        /**
         * Get selected goals for bulk action (marked===true)
         */
        function getSelectedGoalsForBulkAction() {
            return _.filter(_(vm.goals).value(), 'marked', true);
        }

        function cancelBulkAction() {
            var allCurrentlySelected = getSelectedGoalsForBulkAction();

            _.each(allCurrentlySelected, function (currentlySelected) {
                currentlySelected.marked = !currentlySelected.marked;
            });
        }

        function performBulkDelete() {
            var selectedForBulkDelete = angular.copy(getSelectedGoalsForBulkAction());

            // ---
            // Try to save them at once and if successfully, update the user.
            // ---
            GoalService
                .bulkDelete(selectedForBulkDelete, vm.bulkDeleteTracker)
                .then(function () {
                    $rootScope.$broadcast(GOAL_EVENTS.isDeleted, { goals: selectedForBulkDelete });
                })
                .catch(function () {
                    $rootScope.$broadcast(GOAL_EVENTS.isErrorOccurred, 'We\'ve encountered an error while trying to perform bulk action.');
                });
        }

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

        // ---
        // EVENT LISTENERS (listen for events from e.g. entries list).
        // ---

        /**
         * On goal created, display a success message, and add goal to the list.
         */
        $scope.$on(GOAL_EVENTS.isCreated, function (event, args) {
            var isSameMonth = moment(moment(vm.goalsData.yearMonthDate).month()).isSame(moment(args.goal.yearMonthDate).month());

            if (isSameMonth) {
                vm.goals.push(args.goal);
            }

            $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.goalCreated);
            $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Saved');
        });

        /**
         * On goal updated.
         */
        $scope.$on(GOAL_EVENTS.isUpdated, function (event, args) {
            _.remove(vm.goals, 'id', args.goal.id);
            vm.goals.push(args.goal);

            $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Updated');
            $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.goalUpdated);
        });

        /**
         * On goal deleted, display a success message, and remove the goal from the list.
         */
        $scope.$on(GOAL_EVENTS.isDeleted, function (event, args) {
            if (args.goals) {
                removeBulkGoals(args.goals);
            }

            $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Deleted');
            $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.goalDeleted);
        });

        function removeBulkGoals(selectedForBulkDelete) {
            _.each(selectedForBulkDelete, function (selectedForBulkDeleteEntry) {
                _.remove(vm.goals, 'id', selectedForBulkDeleteEntry.id);
            });
        }

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
