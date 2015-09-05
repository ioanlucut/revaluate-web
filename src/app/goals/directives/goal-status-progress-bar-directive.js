(function () {
    'use strict';

    function GoalStatusProgressBarController($scope) {
        var vm = this,
            THRESHOLD = 10;

        // ---
        // Initially, prepare data with this information.
        // ---
        prepareData(vm.goal);

        function prepareData(goal) {
            var noOfDaysInMonth, currentDay;

            // ---
            // Target value of the goal.
            // ---
            vm.targetValue = goal.value;

            // ---
            // The current value of the goal.
            // ---
            vm.currentValue = goal.goalStatus.currentValue;

            // ---
            // The type of the progress bar goal.
            // ---
            vm.type = computeProgressBarType(vm.currentValue, vm.targetValue, goal.goalTarget);

            /**
             * If warning should be shown
             */
            vm.showWarning = (vm.type === 'danger' || vm.type === 'warning');

            // ---
            // Compute the today position.
            // ---
            noOfDaysInMonth = daysInMonth();
            currentDay = moment().date();
            vm.todayPosition = (100 * currentDay) / noOfDaysInMonth;
        }

        function getMinMaxThreshold(of) {
            var result = (THRESHOLD / 100) * of;

            return {
                min: of - result,
                max: of + result
            };
        }

        function computeProgressBarType(currentValue, targetValue, type) {
            var LEVEL_SUCCESS = 'success',
                LEVEL_INFO = 'info',
                LEVEL_WARNING = 'warning',
            /* LEVEL_DANGER = 'danger',*/
                thresholdTarget = getMinMaxThreshold(targetValue);

            // 0, -10, 10

            // MORE THAN 100
            // actual = 30;
            // thresholdMin = 90
            // thresholdMax = 110
            // 30 >= 90
            // 30 > 90 e ok

            if (type === 'MORE_THAN') {
                if (_.gt(currentValue, targetValue)) {
                    return LEVEL_SUCCESS;
                } else if (_.gte(currentValue, thresholdTarget.min)) {
                    return LEVEL_INFO;
                } else {
                    return LEVEL_WARNING;
                }
            } else if (type === 'LESS_THAN') {
                if (_.lt(currentValue, targetValue)) {
                    return LEVEL_SUCCESS;
                } else if (_.lte(currentValue, thresholdTarget.max)) {
                    return LEVEL_INFO;
                } else {
                    return LEVEL_WARNING;
                }
            }
        }

        function daysInMonth() {
            return new Date(moment().year(), moment().month(), 0).getDate();
        }

        $scope.$watch(function () {
            return vm.goal;
        }, function (newGoal) {
            prepareData(newGoal);
        });
    }

    angular
        .module('revaluate.goals')
        .directive('goalStatusProgressBar', function () {
            return {
                restrict: 'E',
                scope: {
                    goal: '='
                },
                controller: GoalStatusProgressBarController,
                bindToController: true,
                controllerAs: 'vm',
                templateUrl: '/app/goals/partials/goal-status-progress-bar-directive.tpl.html',
                link: function () {
                }
            };
        });
}());
