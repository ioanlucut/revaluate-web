function GoalsDisplayEntryController($rootScope, $scope, ColorsUtils, GoalProgressTypeService) {
  'ngInject';

  const _this = this;

  const GOAL_CHART_OPTIONS = {
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke: true,

    //String - The colour of each segment stroke
    segmentStrokeColor: '#fff',

    //Number - The width of each segment stroke
    segmentStrokeWidth: 1,

    //Number - The percentage of the chart that we cut out of the middle
    percentageInnerCutout: 90, // This is 0 for Pie charts

    //Number - Amount of animation steps
    animationSteps: 100,

    //String - Animation easing effect
    animationEasing: 'easeOutBounce',

    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate: true,

    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale: false,
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
      ColorsUtils.getColour(ColorsUtils.hexToRgb('#dddddd'.substr(1))),
    ];

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
