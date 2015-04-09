/**
 * Authentication service filter used to redirect user to the home page if it is already logged in.
 */
angular
    .module("account")
    .service("AuthFilter", function (AuthService, StatesHandler, User) {

        return function (event, toState) {
            if ( (toState.url === '/account' || toState.name === "home") && AuthService.isAuthenticated() ) {

                // Prevent transition
                event.preventDefault();
                StatesHandler.goToExpenses();
            } else if ( (toState.url.indexOf("/settings") > -1 || toState.url.indexOf("/expenses") > -1) && !AuthService.isAuthenticated() ) {

                // Prevent transition
                event.preventDefault();
                AuthService.saveAttemptUrl();
                StatesHandler.goToLogin();
            } else if ( toState.url.indexOf("/setup") > -1 && AuthService.isAuthenticated() && User.$new().loadFromSession().isInitiated() ) {

                // Prevent transition
                event.preventDefault();
                StatesHandler.goToExpenses();
            }
        };

    });