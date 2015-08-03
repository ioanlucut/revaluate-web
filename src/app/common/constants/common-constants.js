(function () {
    'use strict';

    /**
     * Common states.
     */
    angular
        .module('revaluate.common')
        .constant('STATES', {
            home: 'home',
            profile: 'profile',
            expenses: 'expenses.regular',
            setUp: 'setup',
            pricing: 'pricing',
            addPayment: 'settings.payment.add',
            insightsPayment: 'settings.payment.insights',
            account: 'account'
        })
        .constant('ACCESS_LEVEL', {
            forLoggedUser: 'forLoggedUser',
            forGuestUser: 'forGuestUser'
        })
        .constant('ERROR_INTERCEPTOR', {
            status500: 'status500',
            status402: 'status402'
        });
}());
