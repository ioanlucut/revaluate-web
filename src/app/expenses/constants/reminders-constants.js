/**
 * Expenses constants.
 */
angular
    .module("expenses")
    .constant("REMINDER_URLS", {
        create: "expenses",
        update: "expenses/:reminderId",
        details: "expenses/:reminderId",
        delete: "expenses/:reminderId",
        allReminders: "expenses",
        pastReminders: "expenses/past?:local_time&:local_time_zone",
        upcomingReminders: "expenses/upcoming?:local_time&:local_time_zone",
        unSubscribeReminder: "expenses/:reminderId/unsubscribe"
    })
    .constant("REMINDER_EVENTS", {
        isCreated: "expense-is-created",
        isUnSubscribed: "expense-is-unsubscribed",
        isDeleted: "expense-is-deleted",
        isUpdated: "expense-is-updated"
    });