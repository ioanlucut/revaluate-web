export default

function InsightsProgressFactory(InsightsAbstract) {
  'ngInject';

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
