export default

function InsightsMonthlyController(
  USER_ACTIVITY_EVENTS,
  INSIGHTS_CHARTS,
  ALERTS_CONSTANTS,
  ALERTS_EVENTS,
  $controller,
  $scope,
  promiseTracker,
  DatesUtils,
  $rootScope,
  $filter,
  $timeout,
  InsightsGenerator,
  InsightsService,
  insightsMonthly,
  monthsPerYearsStatistics) {

  const vm = this;

  /**
   * Alert identifier
   */
  vm.alertId = ALERTS_CONSTANTS.insightsMonthly;

  /**
   * Current user.
   */
  vm.user = $rootScope.currentUser;

  /**
   * Fetch all types of insights charts
   */
  vm.INSIGHTS_CHARTS = INSIGHTS_CHARTS;

  /**
   * Default insights loaded.
   */
  vm.insightsMonthly = insightsMonthly;

  /**
   * Insights months per years.
   */
  vm.monthsPerYearsStatistics = monthsPerYearsStatistics;

  // ---
  // Inherit from parent controller.
  // ---
  angular.extend(this, $controller('InsightsAbstractController', {
    $scope,
    $timeout,
    $rootScope,
    $filter,
    monthsPerYearsStatistics,
    resizeOnUpdate: true,
    getChartSetSize: function getChartSetSize() {
      return vm.barInsightsPrepared.insightsBarData.length;
    },
  }));

  // ---
  // Computed information and methods.
  // ---
  prepareDataForChart();

  /**
   * Default active chart
   */
  vm.activeChart = vm.INSIGHTS_CHARTS.BAR;

  /**
   * Sets te active chart displayed with the given chart type.
   */
  vm.setActiveChart = chartType => {
    vm.activeChart = chartType;
  };

  /**
   * Exposed insights data.
   */
  vm.insightData = {
    yearMonthDate: moment().toDate(),
  };

  /**
   * On date change do load insights
   */
  vm.loadInsight = loadInsight;

  /**
   * Create a saving tracker.
   */
  vm.loadTracker = promiseTracker();

  /**
   * Prepares data for chart
   */
  function prepareDataForChart() {
    // ---
    // Computed information and methods.
    // ---
    vm.barInsightsPrepared = InsightsGenerator
      .generateMonthlyBar(vm.insightsMonthly);

    vm.donutInsightsPrepared = InsightsGenerator
      .generateMonthlyDonut(vm.insightsMonthly);

    $scope.$emit('chartsLoaded', { size: vm.barInsightsPrepared.insightsBarData.length });
  }

  /**
   * Load insights
   */
  function loadInsight(ofYearMonthDate) {
    let period;

    if (vm.loadTracker.active()) {

      return;
    }

    period = DatesUtils
      .getFromToOfMonthYear(ofYearMonthDate);

    InsightsService
      .fetchMonthlyInsightsFromTo(period.from, period.to, vm.loadTracker)
      .then(receivedInsight => {
        vm.insightsMonthly = receivedInsight;
        prepareDataForChart();

        // ---
        // If there was a previously error, just clear it.
        // ---
        $scope.$emit(ALERTS_EVENTS.CLEAR, {
          alertId: vm.alertId,
        });
        $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.insightsFetched);
      })
      .catch(() => {
        vm.badPostSubmitResponse = true;
        $scope.$emit(ALERTS_EVENTS.DANGER, {
          message: 'Could not fetch insights.',
          alertId: vm.alertId,
        });
      });
  }

}
