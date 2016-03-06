export default

  function StatisticsFactory() {
    class Statistics {
      constructor(data) {

        /**
         * The monthsPerYears.
         */
        this.monthsPerYears = data.monthsPerYears;
      }

      isOverallTransactionsEmpty() {
        return _.keys(this.monthsPerYears).length === 0;
      }
    }

    return Statistics;
  }

