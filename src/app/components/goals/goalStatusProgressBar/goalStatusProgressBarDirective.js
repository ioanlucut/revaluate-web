function GoalStatusProgressBarController($scope, $rootScope, GoalProgressTypeService) {
  const _this = this;

  /**
   * Current user.
   */
  _this.user = $rootScope.currentUser;

  /**
   * Goals on current month.
   */
  _this.isCurrentMonthSelected = moment().isSame(moment(_this.goal.endDate), 'month');

  // ---
  // Initially, prepare data with this information.
  // ---
  prepareData(_this.goal);

  function prepareData(goal) {
    let noOfDaysInMonth, currentDay;

    // ---
    // Target value of the goal.
    // ---
    _this.targetValue = goal.value;

    // ---
    // The current value of the goal.
    // ---
    _this.currentValue = goal.goalStatus.currentValue;

    // ---
    // The type of the progress bar goal.
    // ---
    _this.type = GoalProgressTypeService.computeProgressBarType(goal);

    /**
     * If warning should be shown
     */
    _this.showWarning = _this.type === 'danger' || _this.type === 'warning';

    // ---
    // Compute the today position.
    // ---
    noOfDaysInMonth = daysInMonth();
    currentDay = moment().date();
    _this.todayPosition = ((100 / noOfDaysInMonth) * currentDay) - ((100 / noOfDaysInMonth) / 2);
  }

  function daysInMonth() {
    return new Date(moment().year(), moment().month() + 1, 0).getDate();
  }

  $scope.$watch(() => _this.goal, newGoal => {

    prepareData(newGoal);
  });
}

function goalStatusProgressBarDirective() {
  return {
    restrict: 'E',
    scope: {
      goal: '=',
    },
    controller: GoalStatusProgressBarController,
    bindToController: true,
    controllerAs: 'vm',
    templateUrl: '/app/components/goals/goalStatusProgressBar/goalStatusProgressBarDirective.tpl.html',
    link() {
    },
  };
}

export default goalStatusProgressBarDirective;
