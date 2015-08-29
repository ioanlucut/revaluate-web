(function () {
    'use strict';

    function GoalFactory() {

        /**
         * Goal class.
         */
        function Goal(data) {

            /**
             * The goal id.
             */
            this.id = data.id;

            /**
             * The goal description.
             */
            this.category = data.category;

            /**
             * The goal target.
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
        .module('revaluate.insights')
        .factory('Goal', GoalFactory);
}());
