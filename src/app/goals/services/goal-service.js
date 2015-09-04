(function () {
    'use strict';

    function GoalService(GOAL_URLS, $http, DatesUtils, GoalTransformerService) {

        this.createGoal = function (goal, tracker) {
            return $http
                .post(URLTo.api(GOAL_URLS.create), GoalTransformerService.goalApiRequestTransformer(goal), { tracker: tracker })
                .then(GoalTransformerService.goalApiResponseTransformer);
        };

        this.updateGoal = function (goal, tracker) {
            var goalDto = GoalTransformerService.goalApiRequestTransformer(goal);

            return $http
                .put(URLTo.api(GOAL_URLS.update), goalDto, { tracker: tracker })
                .then(GoalTransformerService.goalApiResponseTransformer);
        };

        this.getAllGoalsFromTo = function (from, to, tracker) {
            var fromFormatted = DatesUtils.formatDate(from),
                toFormatted = DatesUtils.formatDateExpectedForEndOfMonth(to);

            return $http
                .get(URLTo.api(GOAL_URLS.allGoalsFromTo, {
                    ':from': fromFormatted,
                    ':to': toFormatted
                }), { tracker: tracker })
                .then(GoalTransformerService.goalApiResponseTransformer);
        };

        /**
         * Bulk delete action of a list of goals.
         */
        this.bulkDelete = function (goals, tracker) {
            return $http
                .put(URLTo.api(GOAL_URLS.bulkDelete), GoalTransformerService.goalApiRequestTransformer(goals), { tracker: tracker });
        };

    }

    angular
        .module('revaluate.goals')
        .service('GoalService', GoalService);
}());
