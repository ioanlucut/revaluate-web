export default

  function StatisticsFactory() {

    /**
     * Statistics class.
     */
    function Statistics(data) {

      /**
       * The monthsPerYears.
       */
      this.monthsPerYears = data.monthsPerYears;
    }

    Statistics.prototype.isOverallTransactionsEmpty = function () {
      return _.keys(this.monthsPerYears).length === 0;
    };

    return Statistics;
  }

