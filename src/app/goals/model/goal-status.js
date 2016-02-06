'use strict';

function GoalStatusFactory(InsightsDaily) {

    /**
     * Goal status factory function.
     */
    function goalStatus(data) {

        return _.extend({}, {
            currentValue: data.currentValue,
            goalAccomplished: data.goalAccomplished,
            daily: InsightsDaily.build(data.insightsDaily)
        });
    }

    return {
        build: goalStatus
    };
}

export default angular
    .module('revaluate.goals')
    .factory('GoalStatus', GoalStatusFactory)
    .name;
