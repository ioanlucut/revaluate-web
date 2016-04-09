function GoalsDisplayEntryController($rootScope, $filter, $scope, ChartJs, ColorsUtils, GoalProgressTypeService) {
  'ngInject';

  const _this = this;

  const MAX_PERCENT = 100;

  const COLORS = {
    success: '#13ca6d',
    info: '#4FC1E9',
    danger: '#ED5565',
    warning: '#FFCE54',
  };

  const NEUTRAL_COLOR = '#dddddd';

  const GOAL_CHART_OPTIONS = {
    cutoutPercentage: 90,
    animation: {
      easing: 'easeOutExpo',
      animateRotate: true,
      animateScale: false,
    },
    tooltips: {
      callbacks: {
        title: function (tooltipItems, data) {
          return data.labels[tooltipItems[0].index];
          ;
        },

        label: function () {
          return '';
        },
      },
    },
  };

  _this.user = $rootScope.currentUser;
  _this.donutChartOptions = _.merge({}, ChartJs.getOptions(), GOAL_CHART_OPTIONS);

  // ---
  // Initial computation.
  // ---
  calculateGoalData();

  function calculateGoalData() {
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

    // ---
    // Two datasets 1. VALUES; 2. DAYS.
    // ---

    _this.colors = [
      ColorsUtils.getColour(ColorsUtils.hexToRgb(_this.goal.category.color.color.substr(1))),
      ColorsUtils.getColour(ColorsUtils.hexToRgb(NEUTRAL_COLOR.substr(1))),
    ];

    _this.labels = [
      `${formatChartValue({ value: _this.currentValue })} spent.`,
      `Target: ${formatChartValue({ value: _this.targetValue })}`,
    ];

    // ---
    // Compute the today position.
    // ---
    let noOfDaysInMonth = daysInMonth();
    let currentDay = moment().date();
    _this.todayInPercent = ((MAX_PERCENT / noOfDaysInMonth) * currentDay) - ((MAX_PERCENT / noOfDaysInMonth) / 2);
    _this.percent = (_this.currentValue * MAX_PERCENT) / _this.targetValue;

    _this.data = [
      noDecimals(_this.percent), noDecimals(MAX_PERCENT - _this.percent),
    ];
  }

  function daysInMonth() {
    return new Date(moment().year(), moment().month() + 1, 0).getDate();
  }

  function formatChartValue(price) {

    return `${$filter('currency')(price.value.toString(), '', _this.user.model.currency.fractionSize)} ${_this.user.model.currency.symbol}`;
  }

  function noDecimals(input) {
    return $filter('number')(input, 0);
  }

  $scope.$watch(() => _this.goal, newGoal => {

    calculateGoalData(newGoal);
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
