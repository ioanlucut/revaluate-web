'use strict';

/**
 * Common mixpanel events.
 */
angular
    .module("revaluate.common")
    .constant("MIXPANEL_EVENTS", {
        homePage: "Home page",
        pricingPage: "Pricing page",
        privacyPage: "Privacy page",

        signUpRequested: "Signup requested",
        signUpCompleted: "Signup completed",

        expensesPage: "Expenses page",
        expenseCreated: "Expense created",
        expenseUpdated: "Expense updated",
        expenseDeleted: "Expense deleted",

        categoriesPage: "Categories page",
        categoryCreated: "Category created",
        categoryUpdated: "Category updated",
        categoryDeleted: "Category deleted",

        insightsPage: "Insights page",
        insightsFetched: "Insights fetched",

        settings: "Settings",
        settingsProfile: "Settings profile",
        settingsPaymentAdd: "Settings payment method add",
        settingsPaymentMethodEdit: "Settings payment method edit",
        settingsPaymentMethodEditCustomer: "Settings payment method edit customer",
        settingsPaymentInsights: "Settings payment insights",
        settingsAccount: "Settings account",
        settingsPreferences: "Settings preferences",
        settingsImportChoose: "Settings import choose",
        settingsImport: "Settings import",

        account: "Settings import",
        accountLogout: "Settings import",
        accountValidatePasswordResetTokenValid: "Settings import",
        accountValidatePasswordResetTokenInvalid: "Settings import",
        accountConfirmationEmailValid: "Settings import",
        accountConfirmationEmailInvalid: "Settings import",
        accountSetup: "Settings import",

        accountSetupFinished: "Settings import",

        error404: "error-404",
        error500: "error-500"
    });
