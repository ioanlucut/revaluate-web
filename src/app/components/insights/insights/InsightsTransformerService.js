/**
 * InsightsMonthly transformer service which transforms a insights DTO
 * model object to a insights business object.
 */
function InsightsTransformerService(InsightsMonthly,
                                    InsightsDaily,
                                    InsightsProgress,
                                    InsightsOverview) {
  'ngInject';

  this.insightsMonthlyApiResponseTransformer = responseData => InsightsMonthly
    .build(_.extend(responseData.data, {
      from: moment(responseData.data.from).toDate(),
      to: moment(responseData.data.from).toDate(),
    }));

  this.insightsOverviewApiResponseTransformer = responseData => InsightsOverview
    .build(responseData.data);

  this.insightsProgressApiResponseTransformer = responseData => InsightsProgress
    .build(responseData.data);

  this.insightDailyApiResponseTransformer = responseData => InsightsDaily
    .build(responseData.data);
}

export default InsightsTransformerService;
