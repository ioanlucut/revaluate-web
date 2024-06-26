(function () {
    'use strict';

    // ---
    // Utilities.
    // ---
    var testUtils = require('helpers/tests');

    describe('Expense', function () {

        // Inject app
        beforeEach(function () {

            // ---
            // Provide APP_CONFIG.
            // ---
            angular.mock.module(testUtils.mockAppConfig);

            angular.mock.module('revaluate');
        });

        it('Should inject the service', inject(function (Expense) {
            expect(Expense).toBeTruthy();
        }));

        it('Should be able to instantiate correctly', inject(function (Expense) {

            var expenseDto = {
                    id: '1',
                    value: 1.2,
                    description: 'desc'
                },
                actual = new Expense(expenseDto);

            expect(actual).toBeTruthy();
            expect(actual.id).toEqual(expenseDto.id);
            expect(actual.value).toEqual(expenseDto.value);
            expect(actual.description).toEqual(expenseDto.description);
        }));
    });
}());
