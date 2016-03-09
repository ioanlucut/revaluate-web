export default

function GoalTransformerService(Goal, DatesUtils) {

  this.goalApiRequestTransformer = requestData => {

    function buildGoalPayload(data) {
      const newly = _.extend(data, {
        startDate: DatesUtils.formatStartOfMonthInclusive(data.startDate),
        endDate: DatesUtils.formatEndOfMonthExclusive(data.endDate),
      });

      return _.omit(newly, ['modifiedDate', 'createdDate', 'yearMonthDate', 'marked']);
    }

    if (_.isArray(requestData)) {
      return _.map(requestData, buildGoalPayload);
    } else {
      return buildGoalPayload(requestData);
    }
  };

  this.goalApiResponseTransformer = responseData => {
    function buildGoal(data) {
      return Goal.build(_.extend(data, {
        startDate: toDate(data.startDate),
        endDate: toDate(data.endDate),
        modifiedDate: toDate(data.modifiedDate),
        createdDate: toDate(data.createdDate),
        yearMonthDate: toDate(data.startDate),
      }));
    }

    function toDate(candidate) {
      return moment(candidate).toDate();
    }

    if (_.isArray(responseData.data)) {
      return _.map(responseData.data, buildGoal);
    } else {
      return buildGoal(responseData.data);
    }
  };
}

export default GoalTransformerService;
