(function () {
    'use strict';

    function GoalFactory(GoalStatus) {

        /**
         * Goal class.
         */
        function Goal(data) {

            /**
             * The goal id.
             */
            this.id = data.id;

            /**
             * The goal category.
             */
            this.category = data.category;

            /**
             * The goal target (LESS,MORE).
             */
            this.goalTarget = data.goalTarget;

            /**
             * The goal value
             */
            this.value = data.value;

            /**
             * Start date of the goal.
             */
            this.startDate = data.startDate;

            /**
             * End date of the goal.
             */
            this.endDate = data.endDate;

            /**
             * Created date of the goal.
             */
            this.createdDate = data.createdDate;

            /**
             * Created date of the goal.
             */
            this.modifiedData = data.modifiedData;

            /**
             * Goal status
             */
            this.goalStatus = data.goalStatusDTO && new GoalStatus(data.goalStatusDTO);

            /**
             * The year month of this goal.
             */
            this.yearMonthDate = data.yearMonthDate;

            /**
             * Shows if this goal is marked (can be used e.g. in a bulk list)
             */
            this.marked = false;
        }

        return Goal;
    }

    angular
        .module('revaluate.goals')
        .factory('Goal', GoalFactory);
}());
