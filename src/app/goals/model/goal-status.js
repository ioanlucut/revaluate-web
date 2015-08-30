(function () {
    'use strict';

    function GoalStatusFactory(Daily) {

        /**
         * Goal status class.
         */
        function GoalStatus(data) {

            this.currentValue = data.currentValue;

            this.goalAccomplished = data.goalAccomplished;

            this.daily = new Daily(data.insightsDaily);
        }

        return GoalStatus;
    }

    angular
        .module('revaluate.goals')
        .factory('GoalStatus', GoalStatusFactory);
}());
