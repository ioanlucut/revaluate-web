(function () {
    'use strict';

    // ---
    // Utilities.
    // ---
    var testUtils = require('helpers/tests');

    describe('app/GoalProgressTypeService', function () {

        var GoalProgressTypeService, Goal;
        beforeEach(function () {

            // ---
            // Load templates.
            // ---
            angular.mock.module('gulpAngular');

            // ---
            // Provide APP_CONFIG.
            // ---
            angular.mock.module(testUtils.mockAppConfig);

            // ---
            // Just inject the angular.mock.module and define dependencies.
            // ---
            angular.mock.module('revaluate', function () {
            });

            inject(function (_GoalProgressTypeService_, _Goal_) {
                GoalProgressTypeService = _GoalProgressTypeService_;
                Goal = _Goal_;
            });
        });

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

        it('GoalProgressTypeService should be defined', function () {
            expect(GoalProgressTypeService).toBeDefined();
        });

        it('GoalProgressTypeService LESS_THAN suite', function () {

            expect(GoalProgressTypeService.computeProgressBarType(buildWith(100, 0, 'LESS_THAN'))).toBe('success');
            expect(GoalProgressTypeService.computeProgressBarType(buildWith(100, 9, 'LESS_THAN'))).toBe('success');
            expect(GoalProgressTypeService.computeProgressBarType(buildWith(100, 10, 'LESS_THAN'))).toBe('success');
            expect(GoalProgressTypeService.computeProgressBarType(buildWith(100, 11, 'LESS_THAN'))).toBe('success');
            expect(GoalProgressTypeService.computeProgressBarType(buildWith(100, 89, 'LESS_THAN'))).toBe('success');
            expect(GoalProgressTypeService.computeProgressBarType(buildWith(100, 90, 'LESS_THAN'))).toBe('info');
            expect(GoalProgressTypeService.computeProgressBarType(buildWith(100, 91, 'LESS_THAN'))).toBe('info');
            expect(GoalProgressTypeService.computeProgressBarType(buildWith(100, 99, 'LESS_THAN'))).toBe('info');
            expect(GoalProgressTypeService.computeProgressBarType(buildWith(100, 100, 'LESS_THAN'))).toBe('warning');
            expect(GoalProgressTypeService.computeProgressBarType(buildWith(100, 101, 'LESS_THAN'))).toBe('warning');
            expect(GoalProgressTypeService.computeProgressBarType(buildWith(100, 109, 'LESS_THAN'))).toBe('warning');
            expect(GoalProgressTypeService.computeProgressBarType(buildWith(100, 110, 'LESS_THAN'))).toBe('danger');
            expect(GoalProgressTypeService.computeProgressBarType(buildWith(100, 111, 'LESS_THAN'))).toBe('danger');
        });

        it('GoalProgressTypeService MORE_THAN suite', function () {

            expect(GoalProgressTypeService.computeProgressBarType(buildWith(100, 0, 'MORE_THAN'))).toBe('danger');
            expect(GoalProgressTypeService.computeProgressBarType(buildWith(100, 9, 'MORE_THAN'))).toBe('danger');
            expect(GoalProgressTypeService.computeProgressBarType(buildWith(100, 10, 'MORE_THAN'))).toBe('danger');
            expect(GoalProgressTypeService.computeProgressBarType(buildWith(100, 11, 'MORE_THAN'))).toBe('warning');
            expect(GoalProgressTypeService.computeProgressBarType(buildWith(100, 89, 'MORE_THAN'))).toBe('warning');
            expect(GoalProgressTypeService.computeProgressBarType(buildWith(100, 90, 'MORE_THAN'))).toBe('info');
            expect(GoalProgressTypeService.computeProgressBarType(buildWith(100, 91, 'MORE_THAN'))).toBe('info');
            expect(GoalProgressTypeService.computeProgressBarType(buildWith(100, 99, 'MORE_THAN'))).toBe('info');
            expect(GoalProgressTypeService.computeProgressBarType(buildWith(100, 100, 'MORE_THAN'))).toBe('info');
            expect(GoalProgressTypeService.computeProgressBarType(buildWith(100, 101, 'MORE_THAN'))).toBe('success');
            expect(GoalProgressTypeService.computeProgressBarType(buildWith(100, 109, 'MORE_THAN'))).toBe('success');
            expect(GoalProgressTypeService.computeProgressBarType(buildWith(100, 110, 'MORE_THAN'))).toBe('success');
            expect(GoalProgressTypeService.computeProgressBarType(buildWith(100, 111, 'MORE_THAN'))).toBe('success');
        });

        function buildWith(value, currentValue, type) {
            return Goal.build({
                goalTarget: type,
                value: value,
                goalStatusDTO: {
                    currentValue: currentValue,
                    insightsDaily: {
                        from: "2015-10-01T00:00:00.121",
                        to: "2015-10-31T23:59:59.111",
                        totalAmountSpent: 99
                    }
                }
            });

        }

    });
}());
