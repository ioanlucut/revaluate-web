export default

function InsightsAbstractFactory() {

  /**
   * Insights abstract factory function.
   */
  function abstractInsights(data) {

    return _.extend({}, {
      from: data.from,
      to: data.to,
      totalAmountSpent: data.totalAmountSpent,
      numberOfTransactions: data.numberOfTransactions,
    });
  }

  return {
    build: abstractInsights,
  };
}
