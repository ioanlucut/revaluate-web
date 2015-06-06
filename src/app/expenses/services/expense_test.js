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
    }));
});