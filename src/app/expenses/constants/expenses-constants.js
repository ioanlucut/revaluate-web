/**
 * Expenses constants.
 */
angular
    .module("expenses")
    .constant("EXPENSE_URLS", {
        create: "expenses",
        update: "expenses",
        details: "expenses/:id",
        delete: "expenses/:id",
        bulkDelete: "expenses/bulkDelete",
        allExpenses: "expenses/retrieve",
        pastExpenses: "expenses/past?:local_time&:local_time_zone",
        upcomingExpenses: "expenses/upcoming?:local_time&:local_time_zone",
        unSubscribeExpense: "expenses/:id/unsubscribe"
    })
    .constant("EXPENSE_EVENTS", {
        isCreated: "expense-is-created",
        isUnSubscribed: "expense-is-unsubscribed",
        isDeleted: "expense-is-deleted",
        isUpdated: "expense-is-updated"
    });