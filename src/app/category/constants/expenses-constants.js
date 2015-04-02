/**
 * Expenses constants.
 */
angular
    .module("expenses")
    .constant("EXPENSE_URLS", {
        create: "expenses",
        update: "expenses/:expenseId",
        details: "expenses/:expenseId",
        delete: "expenses/:expenseId",
        allExpenses: "expenses",
        pastExpenses: "expenses/past?:local_time&:local_time_zone",
        upcomingExpenses: "expenses/upcoming?:local_time&:local_time_zone",
        unSubscribeExpense: "expenses/:expenseId/unsubscribe"
    })
    .constant("EXPENSE_EVENTS", {
        isCreated: "expense-is-created",
        isUnSubscribed: "expense-is-unsubscribed",
        isDeleted: "expense-is-deleted",
        isUpdated: "expense-is-updated"
    });