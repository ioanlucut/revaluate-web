'use strict';

describe('Expense', function () {

    // Inject app
    beforeEach(function () {

        // ---
        // Provide APP_CONFIG.
        // ---
        module(function ($provide) {
            $provide.constant('APP_CONFIG', {
                "SETUP_MIN_CATEGORIES_TO_SELECT": 3,
                "PREDEFINED_CATEGORIES": ["Bills", "Food"],
                "CURRENCIES": [{
                    "currencyCode": "AED",
                    "displayName": "United Arab Emirates Dirham",
                    "symbol": "د.إ.‏",
                    "numericCode": 784,
                    "fractionSize": 2
                }],
                "VERSION": "1.0.0",
                "MAX_ALLOWED_CATEGORIES": 20,
                "IMPORT_MIN_CATEGORIES_TO_SELECT": 1,
                "TRIAL_DAYS": 15,
                "MIN_ALLOWED_CATEGORIES": 3,
                "MIN_EXPENSES_TO_ENABLE_BULK_ACTION": 1,
                "ALL_COLORS": [{ "id": 1, "color": "#DD5440", "colorName": "red", "priority": 1 }, {
                    "id": 2,
                    "color": "#E29C45",
                    "colorName": "orange",
                    "priority": 2
                }]
            });
        });

        module("revaluate");
    });

    it('Should inject the service', inject(function (Expense) {
        expect(Expense).toBeTruthy();
    }));

    it('Should perform isCreatedBy method correctly', inject(function (Expense, ExpenseTransformerService) {
        var expenseDto = {
            id: "1",
            text: "ABC",
            dueOn: new Date(),
            createdByUser: { email: "createdByEmail@email.email" },
            recipients: [{ email: "xx@xx" }, { email: "yy@yy" }]
        };

        var actual = ExpenseTransformerService.toExpense(expenseDto);
        expect(actual.model).toBeTruthy();
        expect(actual.model.id).toEqual(expenseDto.id);
        expect(actual.model.dueOn).toEqual(expenseDto.dueOn);
        expect(actual.model.recipients).toEqual([{ email: "xx@xx" }, { email: "yy@yy" }]);
    }));
});
