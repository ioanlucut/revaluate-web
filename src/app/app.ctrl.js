/**
 * Main app controller declaration.
 */
angular
    .module("app")
    .controller("AppController", function ($rootScope, $scope, $state, $timeout, $log, flash, AuthService, AccountModal, User, StatesHandler, AUTH_EVENTS, ALERTS_CONSTANTS, ACTIVITY_INTERCEPTOR, AUTH_MODAL, ERROR_INTERCEPTOR, ENV) {

        /**
         * Save the state on root scope
         */
        $rootScope.$state = $state;

        /**
         * Environment
         */
        $rootScope.ENV = ENV;

        /**
         * On app load, retrieve user profile previously saved (if exists).
         */
        $rootScope.currentUser = User.$new().loadFromSession();
        $log.log("Current user: ", $rootScope.currentUser);

        /**
         * Listen to login success event. If user is properly logged in,
         * then retrieve its profile this from cookie used for persistence.
         */
        $scope.$on(AUTH_EVENTS.loginSuccess, function () {
            $rootScope.currentUser = User.$new().loadFromSession();
            AuthService.redirectToAttemptedUrl();
            $log.log("Logged in: ", $rootScope.currentUser);
        });

        /**
         * Sometimes we need to refresh the user from the local storage.
         */
        $scope.$on(AUTH_EVENTS.refreshUser, function () {
            $rootScope.currentUser = User.$new().loadFromSession();
            $log.log("Refreshed user: ", $rootScope.currentUser);
        });

        /**
         * Listen to the session timeout event
         */
        $scope.$on(AUTH_EVENTS.sessionTimeout, function () {
            $log.log("Session timed out.");
            AuthService.logout();
        });

        /**
         * Listen to the not authenticated event
         */
        $scope.$on(AUTH_EVENTS.notAuthenticated, function () {
            $log.log("Not authenticated.");

            AuthService.logout();
            AuthService.saveAttemptUrl();
            StatesHandler.goToLogin();
        });

        /**
         * Listen to the logout event
         */
        $scope.$on(AUTH_EVENTS.logoutSuccess, function () {
            $rootScope.currentUser = User.$new();
            $log.log("Logged out.");
        });

        /**
         * Track activity - for animation loading bar
         */
        $rootScope.$on('$stateChangeStart', function () {
            $rootScope.$broadcast(ACTIVITY_INTERCEPTOR.activityStart);
        });

        $rootScope.$on('$viewContentLoaded', function () {
            // ---
            // Close login modal if everything is loaded.
            // ---
            if ( AccountModal.isOpen ) {
                $rootScope.$broadcast(AUTH_MODAL.close, {})
            }
            $rootScope.$broadcast(ACTIVITY_INTERCEPTOR.activityEnd);
        });

        /**
         * Listen to the internal server error
         */
        $scope.$on(ERROR_INTERCEPTOR.status500, function () {
            $state.go('500');
        });

        /**
         * Listen to the payment required error
         */
        $scope.$on(ERROR_INTERCEPTOR.status402, function () {

            flash.to(ALERTS_CONSTANTS.generalError).error = "Payment method is required in order to use revaluate.";
        });
    });
