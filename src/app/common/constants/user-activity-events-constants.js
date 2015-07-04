'use strict';

/**
 * Common mixpanel events.
 */
angular
    .module("revaluate.common")
    .constant("USER_ACTIVITY_EVENTS", {
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
        settingsImportServerError: "Settings import server error",
        settingsImportUploadSuccess: "Settings import upload success",
        settingsImportSuccess: "Settings import success",

        account: "Account",
        accountLogout: "Account logout",
        accountValidatePasswordResetTokenValid: "Account validate password reset token valid",
        accountValidatePasswordResetTokenInvalid: "Account validate password reset token invalid",
        accountConfirmationEmailValid: "Account confirmation email valid",
        accountConfirmationEmailInvalid: "Account confirmation email invalid",
        accountSetup: "Account setup page",

        accountSetupFinished: "Account setup finished",

        error404: "error-404",
        error500: "error-500"
    });
