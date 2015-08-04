(function () {
    'use strict';

    /**
     * Authentication service filter used to redirect user to the home page if it is already logged in.
     */
    angular
        .module('revaluate.account')
        .service('AuthFilter', function (AuthService, StatesHandler, User, STATES, flash, ALERTS_EVENTS, ALERTS_CONSTANTS) {

            return function (event, toState) {
                if (
                    (toState.url === '/account' || toState.name === 'home') && AuthService.isAuthenticated()) {

                    /*If user is authenticated, and tries to go to /account or home, just to expenses*/
                    event.preventDefault();
                    StatesHandler.goToExpenses();
                } else if (!AuthService.isAuthenticated() && !toState.isPublicPage) {

                    /*If user is not authenticated, save attempt try and go to /account, where login modal is opened*/
                    event.preventDefault();
                    AuthService.saveAttemptUrl();
                    StatesHandler.goToLogin();
                } else if (
                    toState.url.indexOf('/setup') > -1 && AuthService.isAuthenticated() && User.$new().loadFromSession().isInitiated()) {

                    /*Once user is initiated, do not let user to setup page*/
                    event.preventDefault();
                    StatesHandler.goToExpenses();
                } else if (
                    !toState.isPublicPage && toState.url.indexOf('/setup') === -1 && AuthService.isAuthenticated() && !User.$new().loadFromSession().isInitiated()) {

                    /*If user is not initiated but authenticated, and tries to go to a non public page, go to setup page*/
                    event.preventDefault();
                    StatesHandler.goToSetUp();
                } else if (
                    !toState.isPublicPage && !toState.isPaymentMissingUnrestrictedPage && AuthService.isAuthenticated() && User.$new().loadFromSession().isTrialPeriodExpired()) {

                    /*If user is with trial expired, authenticated and tries to go to a non public page, go to payment*/
                    event.preventDefault();

                    // ---
                    // Show error.
                    // ---
                    flash.to(ALERTS_CONSTANTS.generalError).error = 'You must define a payment method.';
                    StatesHandler.goToAddPayment();
                }
            };

        });
}());
