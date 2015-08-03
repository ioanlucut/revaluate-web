(function () {
    'use strict';

    angular
        .module('revaluate.common')
        .constant('ALERTS_CONSTANTS', {
            login: 'login',
            signUp: 'signUp',
            signUpConfirm: 'signUpConfirm',
            oauthConnect: 'oauthConnect',
            signUpSetUp: 'signUpSetUp',
            generalError: 'generalError',
            forgotPassword: 'forgotPassword',
            requestSignUpRegistration: 'requestSignUpRegistration',
            resetPassword: 'resetPassword',
            updatePassword: 'updatePassword',
            validatePassword: 'validatePassword',
            sendConfirmationEmail: 'sendConfirmationEmail',
            createUpdateExpense: 'createUpdateExpense',
            expenseList: 'expenseList',
            insightsMonthly: 'insights',
            insights: 'insights',
            categoryList: 'categoryList',
            createUpdateCategory: 'createUpdateCategory',
            updateProfile: 'updateProfile',
            paymentProfile: 'paymentProfile',
            cancelAccount: 'cancelAccount',
            preferences: 'preferences',
            import: 'import'
        })
        .constant('ALERTS_EVENTS', {
            INFO: 'INFO',
            SUCCESS: 'SUCCESS',
            WARNING: 'WARNING',
            DANGER: 'DANGER',
            CLEAR: 'CLEAR'
        });
}());
