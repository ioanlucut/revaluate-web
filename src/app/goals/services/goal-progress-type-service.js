(function () {
    'use strict';

    function GoalProgressTypeService() {
        var THRESHOLD = 10;

        function getMinMaxThreshold(of) {
            var result = (THRESHOLD / 100) * of;

            return {
                min: of - result,
                max: of + result
            };
        }

        this.computeProgressBarType = function (goal) {
            var currentValue = goal.goalStatus.currentValue,
                targetValue = goal.value,
                type = goal.goalTarget,
                LEVEL_SUCCESS = 'success',
                LEVEL_INFO = 'info',
                LEVEL_WARNING = 'warning',
                LEVEL_DANGER = 'danger',
                thresholdTarget = getMinMaxThreshold(targetValue);

            // 0, -10, 10

            // MORE THAN 100
            // thresholdMin = 90
            // thresholdMax = 110
            // thresholdVeryMin = 10
            // actual > 100 e success
            // actual >= 90 info
            // actual < 90 warning
            // actual <= 10 danger
            //
            // LESS THAN 100
            // thresholdMin = 90
            // thresholdMax = 110
            // thresholdVeryMax = 110
            // actual < 90 success
            // actual >= 90 && < 100 e info
            // actual >= 100 && < 110 e warning
            // actual >= 110 danger

            if (type === 'MORE_THAN') {
                if (_.gt(currentValue, targetValue)) {
                    return LEVEL_SUCCESS;
                } else if (_.gte(currentValue, thresholdTarget.min)) {
                    return LEVEL_INFO;
                } else if (_.lte(currentValue, targetValue - thresholdTarget.min)) {
                    return LEVEL_DANGER;
                } else {
                    return LEVEL_WARNING;
                }
            } else if (type === 'LESS_THAN') {
                if (_.lt(currentValue, thresholdTarget.min)) {
                    return LEVEL_SUCCESS;
                } else if (_.gte(currentValue, thresholdTarget.min) && _.lt(currentValue, targetValue)) {
                    return LEVEL_INFO;
                } else if (_.gte(currentValue, targetValue) && _.lt(currentValue, thresholdTarget.max)) {
                    return LEVEL_WARNING;
                } else if (_.gte(currentValue, thresholdTarget.max)) {
                    return LEVEL_DANGER;
                } else {
                    return LEVEL_SUCCESS;
                }
            }
        };

    }

    angular
        .module('revaluate.goals')
        .service('GoalProgressTypeService', GoalProgressTypeService);
}());
