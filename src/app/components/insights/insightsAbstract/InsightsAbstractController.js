export default

function InsightsAbstractController(UNISON_BREAKPOINTS,
                                    UNISON_EVENTS,
                                    $scope,
                                    $timeout,
                                    $rootScope,
                                    $filter,
                                    monthsPerYearsStatistics,
                                    resizeOnUpdate,
                                    getChartSetSize) {
  'ngInject';

  const _this = this;

  /**
   * Month constant
   */
  _this.MONTH = 'month';

  /**
   * Current user.
   */
  _this.user = $rootScope.currentUser;

  _this.formatChartValue = formatChartValue;

  /**
   * Insights months per years.
   */
  _this.monthsPerYearsStatistics = monthsPerYearsStatistics;

  // ---
  // Specific bar chart options.
  // ---
  _this.barOptions = angular.extend({}, getDefaultChartOptions());

  // ---
  // Specific donut chart options.
  // ---
  _this
    .donutChartOptions = angular.extend({}, getDefaultChartOptions());
  _this
    .donutChartOptions
    .legendTemplate = '<ul class="doughnut__chart__legend"><% for (var i=0; i<segments.length; i++){%><li class="doughnut__chart__legend__box"><span class="doughnut__chart__legend__box__color" style="background-color:<%=segments[i].fillColor%>"></span><span class="doughnut__chart__legend__box__label"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>';

  // ---
  // Chart config options.
  // ---
  function getDefaultChartOptions() {
    return {
      scaleLabel(label) {
        return formatChartValue(label);
      },

      multiTooltipTemplate(label) {
        return `${label.datasetLabel} ${formatChartValue(label)}`;
      },

      tooltipTemplate(label) {
        return `${label.label} ${formatChartValue(label)}`;
      },
    };
  }

  function formatChartValue(price) {

    return `${$filter('currency')(price.value.toString(), '', _this.user.model.currency.fractionSize)} ${_this.user.model.currency.symbol}`;
  }

  // ---
  // RESPONSIVE RELATED.
  // ---

  // ---
  // Updates bar data sets spacing values options (we do not want to have too fat bars - e.g. if there is only one column)
  // ---
  function adjustResizeChartOptionsAndSpacing(currentBreakpoint, chartSetSize) {
    let breakpoint, numberOfSets, spacing;

    if (!resizeOnUpdate) {
      return;
    }

    breakpoint = _.find(UNISON_BREAKPOINTS, breakPointEntry => breakPointEntry.name === currentBreakpoint);

    if (breakpoint) {
      numberOfSets = chartSetSize || getChartSetSize();
      spacing = numberOfSets === 1 ? Math.floor(breakpoint.chartBarWidth * 1.5)
        : Math.floor(breakpoint.chartBarWidth / numberOfSets);

      // ---
      // Update spacing.
      // ---
      $timeout(() => {
        _this.barOptions = angular.extend(_this.barOptions, {
          barValueSpacing: spacing,
          barDatasetSpacing: spacing,
        });
      });
    }

  }

  // ---
  // Listen for the resize events.
  // ---
  $scope
    .$on(UNISON_EVENTS.USN_FIRE, (event, args) => {
      adjustResizeChartOptionsAndSpacing(args);
    });

  // ---
  // Listen for the chart reloaded event.
  // ---
  $scope
    .$on('chartsLoaded', (event, args) => {
      adjustResizeChartOptionsAndSpacing(Unison.fetch.now().name, args.size);
    });
}
