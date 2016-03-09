function GoalDailyStatusController($rootScope, $filter, InsightsGenerator) {

  const _this = this;

  /**
   * Insights current year
   */
  _this.currentYear = moment().year();

  /**
   * Current user.
   */
  _this.user = $rootScope.currentUser;

  // ---
  // Computed information.
  // ---
  _this.barInsightsPrepared = InsightsGenerator
    .generateDailyBar(_this.currentYear, _this.insightsDaily);

  _this.barOptions = {
    scaleLabel(label) {
      return formatChartValue(label);
    },

    multiTooltipTemplate(label) {
      return formatChartValue(label);
    },

    tooltipTemplate(label) {
      return formatChartValue(label);
    },

    scaleShowHorizontalLines: false,
    scaleShowVerticalLines: false,
    scaleShowLabels: false,
    scaleShowGridLines: false,
    showScale: true,
    scaleFontSize: 10,
    tooltipFontSize: 12,
    tooltipTitleFontSize: 12,
    tooltipYPadding: 10,
    tooltipXPadding: 10,
    barValueSpacing: 2,
    maintainAspectRatio: false,
    responsive: true,
  };

  function formatChartValue(price) {
    return `${$filter('currency')(price.value.toString(), '', _this.user.model.currency.fractionSize)} ${_this.user.model.currency.symbol}`;
  }

}

function goalDailyStatusDirective() {
  return {
    restrict: 'E',
    scope: {
      insightsDaily: '=',
    },
    controller: GoalDailyStatusController,
    bindToController: true,
    controllerAs: 'vm',
    templateUrl: '/app/components/goals/goalDailyStatus/goalDailyStatusDirective.tpl.html',
    link() {
    },
  };
}

export default goalDailyStatusDirective;
