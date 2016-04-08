function GoalsDisplayEntryController($rootScope, $filter, $scope, ChartJs, ColorsUtils, GoalProgressTypeService) {
  'ngInject';

  const _this = this;

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
          return data.labels[tooltipItems[0].index];;
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

    _this.labels = [`${formatChartValue({ value: _this.currentValue })} spent.`, `Target: ${formatChartValue({ value: _this.targetValue })}`];

    /**
     * If warning should be shown
     */
    _this.showWarning = _this.type === 'danger' || _this.type === 'warning';
    _this.percent = (_this.currentValue * 100) / _this.targetValue;
    _this.data = [noDecimals(_this.percent), noDecimals(100 - _this.percent)];
  }

  function formatChartValue(price) {

    return `${$filter('currency')(price.value.toString(), '', _this.user.model.currency.fractionSize)} ${_this.user.model.currency.symbol}`;
  }

  function noDecimals(input) {
    return $filter('number')(input, 0);
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
