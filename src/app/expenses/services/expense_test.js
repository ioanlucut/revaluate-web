describe('Expense', function () {

    // Inject app
    beforeEach(module("app"));

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

        //isCreatedBu
        expect(actual.isCreatedBy("createdByEmail@email.email")).toBe(true);
    }));

    it('Should perform isManyRecipients method correctly - if only 1 recipient is there', inject(function (Expense, ExpenseTransformerService) {
        var expenseDto = {
            id: "1",
            text: "ABC",
            dueOn: new Date(),
            recipients: [{ email: "xx@xx" }]
        };

        var actual = ExpenseTransformerService.toExpense(expenseDto);
        expect(actual.model).toBeTruthy();

        //isCreatedBu
        expect(actual.isManyRecipients()).toBe(false);
    }));

    it('Should perform isManyRecipients method correctly - if only 0 recipient is there', inject(function (Expense, ExpenseTransformerService) {
        var expenseDto = {
            id: "1",
            text: "ABC",
            dueOn: new Date(),
            recipients: []
        };

        var actual = ExpenseTransformerService.toExpense(expenseDto);
        expect(actual.model).toBeTruthy();

        //isCreatedBu
        expect(actual.isManyRecipients()).toBe(false);
    }));

    it('Should perform isManyRecipients method correctly - if 2 recipients are there', inject(function (Expense, ExpenseTransformerService) {
        var expenseDto = {
            id: "1",
            text: "ABC",
            dueOn: new Date(),
            recipients: [{ email: "xx@xx" }, { email: "yy@yy" }]
        };

        var actual = ExpenseTransformerService.toExpense(expenseDto);
        expect(actual.model).toBeTruthy();

        //isCreatedBu
        expect(actual.isManyRecipients()).toBe(true)
    }));
});