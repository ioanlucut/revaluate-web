(function () {
    'use strict';

    angular
        .module('revaluate.goals')
        .service('GoalTransformerService', function (Goal, DatesUtils) {

            this.goalApiRequestTransformer = function (requestData) {

                function buildGoalPayload(data) {
                    var newly = _.extend(data, {
                        startDate: DatesUtils.formatStartOfMonthInclusive(data.startDate),
                        endDate: DatesUtils.formatEndOfMonthExclusive(data.endDate)
                    });

                    return _.omit(newly, ['modifiedDate', 'createdDate', 'yearMonthDate', 'marked']);
                }

                if (_.isArray(requestData)) {
                    return _.map(requestData, buildGoalPayload);
                } else {
                    return buildGoalPayload(requestData);
                }
            };

            this.goalApiResponseTransformer = function (responseData) {
                function buildGoal(data) {
                    return new Goal(_.extend(data, {
                        startDate: toDate(data.startDate),
                        endDate: toDate(data.endDate),
                        modifiedDate: toDate(data.modifiedDate),
                        createdDate: toDate(data.createdDate),
                        yearMonthDate: toDate(data.startDate)
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
        });
}());
