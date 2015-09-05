(function () {
    'use strict';

    function GoalStatusProgressBarController($scope) {
        var vm = this;

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
            vm.type = computeProgressBarType
                .call(this);

            /**
             * If warning should be shown
             */
            vm.showWarning = (vm.type === 'danger' || vm.type === 'warning');

            // ---
            // Compute the today position.
            // ---
            noOfDaysInMonth = daysInMonth(),
                currentDay = moment().date();
            vm.todayPosition = (100 * currentDay) / noOfDaysInMonth;
        }

        function computeProgressBarType(currentValue, targetValue) {
            if (currentValue === targetValue) {
                return 'success';
            } else if (currentValue > targetValue) {
                return 'warning';
            } else {
                return 'danger';
            }
        }

        function daysInMonth() {
            return new Date(moment().year(), moment().month(), 0).getDate();
        }

        $scope.$watch(function () {
            return vm.goal;
        }, function (newVal, oldVal) {
            prepareData(newVal);
            console.log('ONCE');
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
