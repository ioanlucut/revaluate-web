export default

function InsightsOverviewFactory(InsightsAbstract) {
  'ngInject';

  /**
   * Overview factory function.
   */
  function insightsOverview(data) {

    return _.extend(InsightsAbstract.build(data), {
      insightsOverview: data.insightsOverview,
    });
  }

  return {
    build: insightsOverview,
  };
}
