describe('ExpenseTransformerService', function () {

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

    it('Should inject the service', inject(function (ExpenseTransformerService) {
        expect(ExpenseTransformerService).toBeTruthy();
    }));

    it('Should transform a expense DTO to expense business object', inject(function (ExpenseTransformerService) {
        var expenseDto = {
            id: "1",
            description: "ABC",
            spentDate: new Date()
        };

        var actual = ExpenseTransformerService.toExpense(expenseDto);
        expect(actual.model).toBeTruthy();
        expect(actual.model.id).toEqual(expenseDto.id);
        expect(actual.model.spentDate).toEqual(expenseDto.spentDate);
    }));

    it('Should transform a expense to a expense DTO and remove everything after @', inject(function (ExpenseTransformerService, Expense) {

        var expense = Expense.build({
            id: "1",
            description: "ABC @Today"
        });

        var actualExpenseDto = ExpenseTransformerService.toExpenseDto(expense);
        expect(actualExpenseDto).toBeTruthy();
        expect(actualExpenseDto.id).toEqual(expense.model.id);
        expect(actualExpenseDto.description).toEqual("ABC @Today");
    }));

    it('Should transform a expense to a expense DTO', inject(function (ExpenseTransformerService, Expense) {

        var expense = Expense.build({
            id: "1",
            description: "ABC"
        });

        var actualExpenseDto = ExpenseTransformerService.toExpenseDto(expense);
        expect(actualExpenseDto).toBeTruthy();
        expect(actualExpenseDto.id).toEqual(expense.model.id);
    }));

    it('Should be truthy even toExpenses is called with empty params', inject(function (ExpenseTransformerService) {
        expect(ExpenseTransformerService).toBeTruthy();
        expect(ExpenseTransformerService.toExpenses()).toBeTruthy();
        expect(ExpenseTransformerService.toExpenses()).toEqual([]);
    }));

    it('Should transform a NULL expense list of DTOs to empty list of expenses business object', inject(function (ExpenseTransformerService) {
        var actualExpenses = ExpenseTransformerService.toExpenses(null);
        expect(actualExpenses).toBeTruthy();
        expect(actualExpenses.length).toBe(0);
        expect(actualExpenses).toEqual([]);
    }));

    it('Should transform a expense list of DTOs to a list of expenses business object', inject(function (ExpenseTransformerService) {
        var expenseDto = {
            id: "1",
            description: "ABC",
            spentDate: new Date()
        };

        var actualExpenses = ExpenseTransformerService.toExpenses([expenseDto, expenseDto]);
        expect(actualExpenses).toBeTruthy();
        expect(actualExpenses.length).toBe(2);
        expect(actualExpenses[0]).toBeTruthy();
        expect(actualExpenses[1]).toBeTruthy();

        expect(actualExpenses[0].model).toBeTruthy();
        expect(actualExpenses[0].model.id).toEqual(expenseDto.id);
        expect(actualExpenses[0].model.spentDate).toEqual(expenseDto.spentDate);

        expect(actualExpenses[1].model).toBeTruthy();
        expect(actualExpenses[1].model.id).toEqual(expenseDto.id);
        expect(actualExpenses[1].model.spentDate).toEqual(expenseDto.spentDate);
    }));

    it('Should remove duplicate emails inside a expense recipients', inject(function (ExpenseTransformerService, Expense) {

        var expense = Expense.build({
            id: "1",
            description: "ABC @Today"
        });

        var actualExpenseDto = ExpenseTransformerService.toExpenseDto(expense);
        expect(actualExpenseDto).toBeTruthy();
        expect(actualExpenseDto.id).toEqual(expense.model.id);
        expect(actualExpenseDto.description).toEqual("ABC @Today");
    }));

});
