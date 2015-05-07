/**
 * Common mixpanel events.
 */
angular
    .module("common")
    .constant("MIXPANEL_EVENTS", {
        landingPageLoaded: "Landing page loaded",
        signUpRequested: "Signup requested",
        signUpCompleted: "Signup completed",
        expensesPage: "Expenses page (site visited)",
        expenseModalOpened: "Expense modal opened",
        expenseCreated: "Expense created",
        expenseUpdated: "Expense updated",
        expenseDeleted: "Expense deleted",
        categoriesPage: "Categories page (site visited)",
        categoryCreated: "Category created",
        categoryUpdated: "Category updated",
        categoryDeleted: "Category deleted",
        insightsPage: "Insights page (site visited)",
        insightsFetched: "Insights fetched",
        settings: "Settings",
        settingsProfile: "Settings profile",
        settingsPreferences: "Settings preferences",
        error404: "error-404",
        error500: "error-500"
    });