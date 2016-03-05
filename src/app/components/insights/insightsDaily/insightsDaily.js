export default

  function InsightsDailyFactory(InsightsAbstract) {

    /**
     * Daily expenses factory function.
     */
    function insightsDaily(data) {

      return _.extend(InsightsAbstract.build(data), {
        totalPerDayDTOs: data.totalPerDayDTOs,
      });
    }

    return {
      build: insightsDaily,
    };
  }

  angular
    .module('revaluate.insights')
    .factory('InsightsDaily', InsightsDailyFactory);

