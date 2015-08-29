(function () {
    'use strict';

    function AddGoalController(GOAL_EVENTS, APP_CONFIG, $scope, GoalService, DatesUtils, Goal, promiseTracker) {

        var vm = this;

        /**
         * Create a saving tracker.
         */
        this.saveTracker = promiseTracker();

        this.initOrResetAddGoal = initOrResetAddGoal;

        this.saveGoal = saveGoal;

        /**
         * Open date picker
         */
        this.openDatePicker = openDatePicker;

        /**
         * Minimum date to create goal.
         */
        this.datePickerMinDate = moment();

        /**
         * Goals targets available
         */
        this.goalsTargets = APP_CONFIG.GOALS_TARGETS;

        /**
         * Perform the first initialization.
         */
        this.initOrResetAddGoal();

        function initOrResetAddGoal() {
            vm.goal = new Goal({
                yearMonthDate: moment().toDate(),
                goalTarget: _.first(vm.goalsTargets).value
            });

            vm.category = {};

            if (vm.goalForm) {
                vm.goalForm.$setPristine();
            }

            vm.badPostSubmitResponse = false;
        }

        function saveGoal() {
            var period = DatesUtils
                .getFromToOfMonthYear(vm.goal.yearMonthDate);

            this.goal.category = angular.copy(this.category.selected);
            this.goal.startDate = period.from;
            this.goal.endDate = period.to;

            GoalService
                .createGoal(this.goal, vm.saveTracker)
                .then(function (createdGoal) {
                    $scope.$emit(GOAL_EVENTS.isCreated, { goal: createdGoal });
                    vm.initOrResetAddGoal();
                })
                .catch(function () {
                    vm.badPostSubmitResponse = true;
                    $scope.$emit(GOAL_EVENTS.isErrorOccurred, { errorMessage: 'Error' });
                });
        }

        function openDatePicker($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.datePickerOpened = true;
        }

    }

    angular
        .module('revaluate.goals')
        .directive('goalAdd', function () {
            return {
                restrict: 'A',
                scope: {
                    categories: '='
                },
                controller: AddGoalController,
                bindToController: true,
                controllerAs: 'vm',
                templateUrl: '/app/goals/partials/goal-add-directive.tpl.html',
                link: function () {
                }
            };
        });
}());
