export default

function InsightsMonthlyController(USER_ACTIVITY_EVENTS,
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
  'ngInject';

  const _this = this;

  /**
   * Alert identifier
   */
  _this.alertId = ALERTS_CONSTANTS.insightsMonthly;

  /**
   * Current user.
   */
  _this.user = $rootScope.currentUser;

  /**
   * Fetch all types of insights charts
   */
  _this.INSIGHTS_CHARTS = INSIGHTS_CHARTS;

  /**
   * Default insights loaded.
   */
  _this.insightsMonthly = insightsMonthly;

  /**
   * Insights months per years.
   */
  _this.monthsPerYearsStatistics = monthsPerYearsStatistics;

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
  }));

  // ---
  // Computed information and methods.
  // ---
  prepareDataForChart();

  /**
   * Default active chart
   */
  _this.activeChart = _this.INSIGHTS_CHARTS.BAR;

  /**
   * Sets te active chart displayed with the given chart type.
   */
  _this.setActiveChart = chartType => {
    _this.activeChart = chartType;
  };

  /**
   * Exposed insights data.
   */
  _this.insightData = {
    yearMonthDate: moment().toDate(),
  };

  /**
   * On date change do load insights
   */
  _this.loadInsight = loadInsight;

  /**
   * Create a saving tracker.
   */
  _this.loadTracker = promiseTracker();

  /**
   * Prepares data for chart
   */
  function prepareDataForChart() {
    // ---
    // Computed information and methods.
    // ---
    _this.barInsightsPrepared = InsightsGenerator
      .generateMonthlyBar(_this.insightsMonthly);

    _this.donutInsightsPrepared = InsightsGenerator
      .generateMonthlyDonut(_this.insightsMonthly);

    $scope.$emit('chartsLoaded', { size: _this.barInsightsPrepared.insightsBarData.length });
  }

  /**
   * Load insights
   */
  function loadInsight(ofYearMonthDate) {
    let period;

    if (_this.loadTracker.active()) {

      return;
    }

    period = DatesUtils
      .getFromToOfMonthYear(ofYearMonthDate);

    InsightsService
      .fetchMonthlyInsightsFromTo(period.from, period.to, _this.loadTracker)
      .then(receivedInsight => {
        _this.insightsMonthly = receivedInsight;
        prepareDataForChart();

        // ---
        // If there was a previously error, just clear it.
        // ---
        $scope.$emit(ALERTS_EVENTS.CLEAR, {
          alertId: _this.alertId,
        });
        $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.insightsFetched);
      })
      .catch(() => {
        _this.badPostSubmitResponse = true;
        $scope.$emit(ALERTS_EVENTS.DANGER, {
          message: 'Could not fetch insights.',
          alertId: _this.alertId,
        });
      });
  }

}
