function GoalsDisplayEntryController($rootScope, $scope, ColorsUtils, GoalProgressTypeService) {
  'ngInject';

  const _this = this;

  const GOAL_CHART_OPTIONS = {
    /*  //Boolean - Whether we should show a stroke on each segment
     segmentShowStroke: true,

     //String - The colour of each segment stroke
     segmentStrokeColor: '#fff',*/

    segmentStrokeWidth: 1,
    cutoutPercentage: 90, // This is 0 for Pie charts
    animation: {
      easing: 'easeOutBounce',
      animateRotate: true,
      animateScale: false,
    },
  };

  _this.user = $rootScope.currentUser;
  _this.donutChartOptions = GOAL_CHART_OPTIONS

  // ---
  // Initially, prepare data with this information.
  // ---
  prepareGoalData();

  function prepareGoalData() {
    // ---
    // Target value of the goal.
    // ---
    _this.targetValue = _this.goal.value;

    // ---
    // The current value of the goal.
    // ---
    _this.currentValue = _this.goal.goalStatus.currentValue;

    // ---
    // The type of the progress bar goal.
    // ---
    _this.type = GoalProgressTypeService.computeProgressBarType(_this.goal);

    _this.colors = [
      ColorsUtils.getColour(ColorsUtils.hexToRgb(_this.goal.category.color.color.substr(1))),
      ColorsUtils.getColour(ColorsUtils.hexToRgb('#6cacae'.substr(1))),
    ];

    console.log(_this.colors)

    _this.labels = ['Current', 'Remains'];
    _this.data = [_this.currentValue, _this.targetValue - _this.currentValue];

    /**
     * If warning should be shown
     */
    _this.showWarning = _this.type === 'danger' || _this.type === 'warning';
    _this.percent = (_this.currentValue * 100) / _this.targetValue;
  }

  $scope.$watch(() => _this.goal, newGoal => {

    prepareGoalData(newGoal);
  });
}

let goalsDisplayEntry = {
  bindings: {
    goal: '=',
  },
  controller: GoalsDisplayEntryController,
  templateUrl: '/app/components/goals/goalsDisplayEntry/goalsDisplayEntry.tpl.html',
};

export default goalsDisplayEntry;
