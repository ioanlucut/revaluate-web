'use strict';

function GoalFactory(GoalStatus) {

    /**
     * Goal status factory function.
     */
    function goal(data) {

        return _.extend({}, {

            /**
             * The goal id.
             */
            id: data.id,

            /**
             * The goal category.
             */
            category: data.category,

            /**
             * The goal target (LESS,MORE).
             */
            goalTarget: data.goalTarget,

            /**
             * The goal value
             */
            value: data.value,

            /**
             * Start date of the goal.
             */
            startDate: data.startDate,

            /**
             * End date of the goal.
             */
            endDate: data.endDate,

            /**
             * Created date of the goal.
             */
            createdDate: data.createdDate,

            /**
             * Created date of the goal.
             */
            modifiedData: data.modifiedData,

            /**
             * Goal status
             */
            goalStatus: data.goalStatusDTO && GoalStatus.build(data.goalStatusDTO),

            /**
             * The year month of this goal.
             */
            yearMonthDate: data.yearMonthDate
        });
    }

    return {
        build: goal
    };
}

export default angular
    .module('revaluate.goals')
    .factory('Goal', GoalFactory)
    .name;
