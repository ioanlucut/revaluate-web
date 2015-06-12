/**
 * Common mixpanel events.
 */
angular
    .module("revaluate.common")
    .constant("MIXPANEL_EVENTS", {
        landingPageLoaded: "Landing page loaded",
        pricingPage: "Landing page loaded",
        privacyPage: "Landing page loaded",

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
        settingsPaymentAdd: "Settings payment",
        settingsPaymentMethodEdit: "Settings payment",
        settingsPaymentMethodEditCustomer: "Settings payment",
        settingsPaymentInsights: "Settings payment customer",
        settingsAccount: "Settings payment customer",
        settingsPreferences: "Settings preferences",
        settingsImportChoose: "Settings import",
        settingsImport: "Settings import",

        account: "Settings import",
        accountLogout: "Settings import",
        accountValidatePasswordResetTokenValid: "Settings import",
        accountValidatePasswordResetTokenInvalid: "Settings import",
        accountConfirmationEmailValid: "Settings import",
        accountConfirmationEmailInvalid: "Settings import",
        accountSetup: "Settings import",

        error404: "error-404",
        error500: "error-500"
    });