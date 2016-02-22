(function () {
  'use strict';

  function GoalStatusProgressBarController($scope, $rootScope, GoalProgressTypeService) {
    var vm = this;

    /**
     * Current user.
     */
    vm.user = $rootScope.currentUser;

    /**
     * Goals on current month.
     */
    vm.isCurrentMonthSelected = moment().isSame(moment(vm.goal.endDate), 'month');

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
      vm.type = GoalProgressTypeService.computeProgressBarType(goal);

      /**
       * If warning should be shown
       */
      vm.showWarning = (vm.type === 'danger' || vm.type === 'warning');

      // ---
      // Compute the today position.
      // ---
      noOfDaysInMonth = daysInMonth();
      currentDay = moment().date();
      vm.todayPosition = ((100 / noOfDaysInMonth) * currentDay) - ((100 / noOfDaysInMonth) / 2);
    }

    function daysInMonth() {
      return new Date(moment().year(), moment().month() + 1, 0).getDate();
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
          goal: '=',
        },
        controller: GoalStatusProgressBarController,
        bindToController: true,
        controllerAs: 'vm',
        templateUrl: '/app/components/goals/goalStatusProgressBar/goalStatusProgressBarDirective.tpl.html',
        link: function () {
        },
      };
    });
}());
