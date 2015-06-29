'use strict';

/**
 * Main app controller declaration.
 */
angular
    .module("revaluate.account")
    .controller("RevaluateAppController", function ($rootScope, $scope, $state, $timeout, $log, $intercom, flash, AuthService, AccountModal, User, StatesHandler, AUTH_EVENTS, ALERTS_CONSTANTS, ACTIVITY_INTERCEPTOR, AUTH_MODAL, ERROR_INTERCEPTOR, ENV, APP_CONFIG) {

        /**
         * Save the state on root scope
         */
        $rootScope.$state = $state;

        /**
         * Environment
         */
        $rootScope.ENV = ENV;

        /**
         * App config
         */
        $rootScope.APP_CONFIG = APP_CONFIG;

        /**
         * On app load, retrieve user profile previously saved (if exists).
         */
        $rootScope.currentUser = User.$new().loadFromSession();
        if ( !ENV.isProduction ) {
            $log.log("Current user: ", $rootScope.currentUser.model);
        }

        /**
         * Listen to login success event. If user is properly logged in,
         * then retrieve its profile this from cookie used for persistence.
         */
        $scope.$on(AUTH_EVENTS.loginSuccess, function () {
            $rootScope.currentUser = User.$new().loadFromSession();
            AuthService.redirectToAttemptedUrl();

            // ---
            // Bootstrap intercom.
            // ---
            $intercom.boot({
                email: $rootScope.currentUser.model.email,
                name: $rootScope.currentUser.model.firstName + ' ' + $rootScope.currentUser.model.lastName,
                created_at: moment($rootScope.currentUser.model.createdDate).unix(),
                user_id: '\'' + $rootScope.currentUser.model.id + '\''
            });

            if ( !ENV.isProduction ) {
                $log.log("Logged in: ", $rootScope.currentUser.model);
            }
        });

        /**
         * Sometimes we need to refresh the user from the local storage.
         */
        $scope.$on(AUTH_EVENTS.refreshUser, function () {
            $rootScope.currentUser = User.$new().loadFromSession();

            if ( !ENV.isProduction ) {
                $log.log("Refreshed user: ", $rootScope.currentUser.model);
            }
        });

        /**
         * Listen to the session timeout event
         */
        $scope.$on(AUTH_EVENTS.sessionTimeout, function () {
            if ( !ENV.isProduction ) {
                $log.log("Session timed out.");
            }
            AuthService.logout();
        });

        /**
         * Listen to the not authenticated event
         */
        $scope.$on(AUTH_EVENTS.notAuthenticated, function () {
            if ( !ENV.isProduction ) {
                $log.log("Not authenticated.");
            }

            AuthService.logout();
            AuthService.saveAttemptUrl();
            StatesHandler.goToLogin();
        });

        /**
         * Listen to the logout event
         */
        $scope.$on(AUTH_EVENTS.logoutSuccess, function () {
            $rootScope.currentUser = User.$new();
            if ( !ENV.isProduction ) {
                $log.log("Logged out.");
            }
        });

        /**
         * Track mixpanel activity
         */
        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            if ( toState.mixpanelId ) {
                mixpanel.track(toState.mixpanelId);
            }

            // ---
            // Handle fullpage.
            // ---
            if ( $.fn.fullpage && $.fn.fullpage.destroy ) {
                $.fn.fullpage.destroy('all');
            }
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

            flash.to(ALERTS_CONSTANTS.generalError).error = "Payment method is required in order to use Revaluate.";
        });
    });
