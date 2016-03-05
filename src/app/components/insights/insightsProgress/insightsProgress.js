export default

function InsightsProgressFactory(InsightsAbstract) {

  /**
   * Progress factory function.
   */
  function insightsProgress(data) {

    return _.extend(InsightsAbstract.build(data), {
      insightsMonthlyDTO: data.insightsMonthlyDTO,
    });
  }

  return {
    build: insightsProgress,
  };
}
