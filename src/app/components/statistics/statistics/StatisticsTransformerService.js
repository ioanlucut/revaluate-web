export default

  function (Statistics) {

    this.statisticApiResponseTransformer = function (responseData) {
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

