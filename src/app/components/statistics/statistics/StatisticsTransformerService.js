function StatisticsTransformerService(Statistics) {
  'ngInject';

  this.statisticApiResponseTransformer = responseData => {
    function buildStatistic(data) {
      return new Statistics(data);
    }

    if (_.isArray(responseData.data)) {
      return _.map(responseData.data, buildStatistic);
    } else {
      return buildStatistic(responseData.data);
    }
  };
}

export default StatisticsTransformerService;
