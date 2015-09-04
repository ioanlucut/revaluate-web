(function () {
    'use strict';

    function GoalStatusProgressBarController() {
        var vm = this,
            noOfDaysInMonth = daysInMonth(),
            currentDay = moment().date();

        vm.targetValue = vm.goal.value;
        vm.currentValue = vm.goal.goalStatus.currentValue;

        function computeType(currentValue, targetValue) {
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

        vm.type = computeType
            .call(this);

        vm.showWarning = (vm.type === 'danger' || vm.type === 'warning');

        vm.todayPosition = (100 * currentDay) / noOfDaysInMonth;
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
