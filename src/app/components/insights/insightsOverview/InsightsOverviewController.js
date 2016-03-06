export default function ($controller, $templateCache, $scope, $rootScope, $filter, $timeout, InsightsGenerator, DatesUtils, ALERTS_EVENTS, INSIGHTS_INTERVAL, insightsOverview, monthsPerYearsStatistics, InsightsService, USER_ACTIVITY_EVENTS, INSIGHTS_CHARTS, ALERTS_CONSTANTS) {

  var TIMEOUT_DURATION = 150;
  var MONTHS = 'Months';

  var _this = this;

  /**
   * Alert identifier
   */
  _this.alertId = ALERTS_CONSTANTS.insights;

  /**
   * Insights interval
   */
  _this.INSIGHTS_INTERVAL = INSIGHTS_INTERVAL;

  /**
   * Default insights overview.
   */
  _this.insightsOverview = insightsOverview;

  // ---
  // Inherit from parent controller.
  // ---
  angular.extend(this, $controller('InsightsAbstractController', {
    $scope: $scope,
    $rootScope: $rootScope,
    $filter: $filter,
    monthsPerYearsStatistics: monthsPerYearsStatistics,
    resizeOnUpdate: true,
    getChartSetSize: function getChartSetSize() {
      return _this.barInsightsPrepared.insightsBarData[0].length;
    },
  }));

  /**
   * Prepares data for chart
   */
  function prepareDataForChart() {
    // ---
    // Computed information and methods.
    // ---
    _this.barInsightsPrepared = InsightsGenerator
      .generateOverviewBar(_this.insightsOverview);

    $scope.$emit('chartsLoaded', { size: _this.barInsightsPrepared.insightsBarData[0].length });
  }

  /**
   * Default interval
   */
  _this.activeInterval = _this.INSIGHTS_INTERVAL.HALF_YEAR;

  /**
   * Series (static)
   */
  _this.insightLineSeries = [MONTHS];

  // ---
  // Computed information and methods.
  // ---
  prepareDataForChart();

  /**
   * Load insights
   */
  _this.loadInsights = function (insightsIntervalMonths) {
    if (_this.isLoading) {

      return;
    }

    _this.isLoading = true;

    var period = DatesUtils
      .fromLastMonthsToNow(insightsIntervalMonths);
    InsightsService
      .fetchOverviewInsightsFromTo(period.from, period.to)
      .then(function (receivedInsight) {
        _this.activeInterval = insightsIntervalMonths;

        /**
         * Track event.
         */
        $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.insightsOverviewFetched);

        $timeout(function () {
          // ---
          // Update everything.
          // ---
          _this.insightsOverview = receivedInsight;

          prepareDataForChart();
          _this.isLoading = false;
        }, TIMEOUT_DURATION);
      })
      .catch(function () {
        _this.badPostSubmitResponse = true;
        _this.isLoading = false;

        $scope.$emit(ALERTS_EVENTS.DANGER, {
          message: 'Could not fetch insights.',
          alertId: _this.alertId,
        });
      });
  };

}
