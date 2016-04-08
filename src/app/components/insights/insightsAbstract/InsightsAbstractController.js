export default

function InsightsAbstractController($scope,
                                    $timeout,
                                    $rootScope,
                                    $filter,
                                    monthsPerYearsStatistics,
                                    resizeOnUpdate,
                                    ChartJs) {
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
  _this.barOptions = _.merge({}, ChartJs.getOptions(), buildBarCustomizedOptions());
  _this.barOptionsDifferentDataSets = _.merge({}, _this.barOptions, {
    tooltips: {
      callbacks: {
        title: function (tooltipItems, data) {
          return data.labels[tooltipItems[0].index];
        },
      },
    },
  });

  // ---
  // Specific donut chart options.
  // ---
  _this
    .donutChartOptions = _.merge({}, ChartJs.getOptions(), buildDonutCustomizedOptions());

  // ---
  // Chart config options.
  // ---
  function buildBarCustomizedOptions() {
    return {
      tooltips: {
        callbacks: {
          title: function (tooltipItems, data) {
            return data.datasets[tooltipItems[0].datasetIndex].label;
          },

          label: function (tooltipItem) {
            return `${formatChartValue({ value: tooltipItem.yLabel })}`;
          },
        },
      },
      scales: {
        xAxes: [{
          display: true,
          gridLines: {
            display: false,
            offsetGridLines: true,
          },
          scaleLabel: {
            show: false,
            labelString: '',
          },
        },],
        yAxes: [{
          display: true,
          gridLines: {
            offsetGridLines: true,
          },
          scaleLabel: {
            show: false,
            labelString: '',
          },
          ticks: {
            fontFamily: '\'proxima-nova\',\'Arial\', sans-serif',
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: 2,
            callback: function (value) {
              return formatChartValue({ value });
            },
          },

        },],
      },
    };
  }

  function buildDonutCustomizedOptions() {
    return {
      tooltips: {
        callbacks: {
          title: function (tooltipItems, data) {
            return data.labels[tooltipItems[0].index];
          },

          label: function (tooltipItem, data) {
            return `${formatChartValue({ value: data.datasets[0].data[tooltipItem.index] })}`;
          },
        },
      },
    };
  };

  function formatChartValue(price) {

    return `${$filter('currency')(price.value.toString(), '', _this.user.model.currency.fractionSize)} ${_this.user.model.currency.symbol}`;
  }
}
