/**
 * Authentication service filter used to redirect user to the home page if it is already logged in.
 */
angular
    .module("revaluate.account")
    .service("AuthFilter", function (AuthService, StatesHandler, User, STATES, flash, ALERTS_CONSTANTS) {

        return function (event, toState) {
            if (
                (toState.url === '/account'
                || toState.name === "home")
                && AuthService.isAuthenticated() ) {
                console.log('1');

                /*If user is authenticated, and tries to go to /account or home, just to expenses*/
                event.preventDefault();
                StatesHandler.goToExpenses();
            } else if ( !AuthService.isAuthenticated() && !toState.isPublicPage ) {
                console.log('2');

                /*If user is not authenticated, save attempt try and go to /account, where login modal is opened*/
                event.preventDefault();
                AuthService.saveAttemptUrl();
                StatesHandler.goToLogin();
            } else if (
                toState.url.indexOf("/setup") > -1
                && AuthService.isAuthenticated()
                && User.$new().loadFromSession().isInitiated() ) {
                console.log('3');

                /*Once user is initiated, do not let user to setup page*/
                event.preventDefault();
                StatesHandler.goToExpenses();
            } else if (
                !toState.isPublicPage
                && toState.url.indexOf("/setup") === -1
                && AuthService.isAuthenticated()
                && !User.$new().loadFromSession().isInitiated() ) {
                console.log('4');

                /*If user is not initiated but authenticated, and tries to go to a non public page, go to setup page*/
                event.preventDefault();
                StatesHandler.goToSetUp();
            } else if (
                !toState.isPublicPage
                && !toState.isPaymentRelatedPage
                && AuthService.isAuthenticated()
                && User.$new().loadFromSession().isTrialPeriodExpired() ) {
                console.log('5');

                /*If user is with trial expired, authenticated and tries to go to a non public page, go to payment*/
                event.preventDefault();

                // ---
                // Show error.
                // ---
                flash.to(ALERTS_CONSTANTS.generalError).error = "You must define a payment method and subscribe to revaluate plan before further using revaluate.";
                StatesHandler.goToAddPayment();
            }

        };

    });