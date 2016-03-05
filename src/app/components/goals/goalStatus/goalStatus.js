export default

  function GoalStatusFactory(InsightsDaily) {

    /**
     * Goal status factory function.
     */
    function goalStatus(data) {

      return _.extend({}, {
        currentValue: data.currentValue,
        goalAccomplished: data.goalAccomplished,
        daily: InsightsDaily.build(data.insightsDaily),
      });
    }

    return {
      build: goalStatus,
    };
  }

