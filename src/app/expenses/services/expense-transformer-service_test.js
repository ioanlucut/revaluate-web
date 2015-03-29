describe('ExpenseTransformerService', function () {

    // Inject app
    beforeEach(module("app"));

    it('Should inject the service', inject(function (ExpenseTransformerService) {
        expect(ExpenseTransformerService).toBeTruthy();
    }));

    it('Should transform a expense DTO to expense business object', inject(function (ExpenseTransformerService) {
        var expenseDto = {
            expenseId: "1",
            text: "ABC",
            dueOn: new Date(),
            recipients: [{ email: "xx@xx" }, { email: "yy@yy" }]
        };

        var actual = ExpenseTransformerService.toExpense(expenseDto);
        expect(actual.model).toBeTruthy();
        expect(actual.model.expenseId).toEqual(expenseDto.expenseId);
        expect(actual.model.dueOn).toEqual(expenseDto.dueOn);
        expect(actual.model.recipients).toEqual([{ email: "xx@xx" }, { email: "yy@yy" }]);
    }));

    it('Should transform a expense to a expense DTO and remove everything after @', inject(function (ExpenseTransformerService, Expense) {

        var expense = Expense.build({
            expenseId: "1",
            text: "ABC @Today",
            recipients: [{ email: "xx@xx" }, { email: "yy@yy" }]
        });

        var actualExpenseDto = ExpenseTransformerService.toExpenseDto(expense);
        expect(actualExpenseDto).toBeTruthy();
        expect(actualExpenseDto.expenseId).toEqual(expense.model.expenseId);
        expect(actualExpenseDto.text).toEqual("ABC");
        expect(actualExpenseDto.recipients).toEqual([{ email: "xx@xx" }, { email: "yy@yy" }]);
    }));

    it('Should transform a expense to a expense DTO', inject(function (ExpenseTransformerService, Expense) {

        var expense = Expense.build({
            expenseId: "1",
            text: "ABC",
            recipients: [{ email: "xx@xx" }, { email: "yy@yy" }]
        });

        var actualExpenseDto = ExpenseTransformerService.toExpenseDto(expense);
        expect(actualExpenseDto).toBeTruthy();
        expect(actualExpenseDto.expenseId).toEqual(expense.model.expenseId);
        expect(actualExpenseDto.recipients).toEqual([{ email: "xx@xx" }, { email: "yy@yy" }]);
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
            expenseId: "1",
            text: "ABC",
            dueOn: new Date(),
            recipients: [{ email: "xx@xx" }, { email: "yy@yy" }]
        };

        var actualExpenses = ExpenseTransformerService.toExpenses([expenseDto, expenseDto]);
        expect(actualExpenses).toBeTruthy();
        expect(actualExpenses.length).toBe(2);
        expect(actualExpenses[0]).toBeTruthy();
        expect(actualExpenses[1]).toBeTruthy();

        expect(actualExpenses[0].model).toBeTruthy();
        expect(actualExpenses[0].model.expenseId).toEqual(expenseDto.expenseId);
        expect(actualExpenses[0].model.dueOn).toEqual(expenseDto.dueOn);
        expect(actualExpenses[0].model.recipients).toEqual([{ email: "xx@xx" }, { email: "yy@yy" }]);

        expect(actualExpenses[1].model).toBeTruthy();
        expect(actualExpenses[1].model.expenseId).toEqual(expenseDto.expenseId);
        expect(actualExpenses[1].model.dueOn).toEqual(expenseDto.dueOn);
        expect(actualExpenses[1].model.recipients).toEqual([{ email: "xx@xx" }, { email: "yy@yy" }]);
    }));

    it('Should remove duplicate emails inside a expense recipients', inject(function (ExpenseTransformerService, Expense) {

        var expense = Expense.build({
            expenseId: "1",
            text: "ABC @Today",
            recipients: [{ email: "xx@xx" }, { email: "xx@xx" }, { email: "tyxx@xx" }, { email: "xxx@xx" }]
        });

        var actualExpenseDto = ExpenseTransformerService.toExpenseDto(expense);
        expect(actualExpenseDto).toBeTruthy();
        expect(actualExpenseDto.expenseId).toEqual(expense.model.expenseId);
        expect(actualExpenseDto.text).toEqual("ABC");

        console.log(actualExpenseDto.recipients);
        expect(actualExpenseDto.recipients).toEqual([{ email: "xx@xx" }, { email: "tyxx@xx" }, { email: "xxx@xx" }]);
    }));

});