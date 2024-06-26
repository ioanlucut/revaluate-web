(function () {
    'use strict';

    /**
     * Main app controller declaration.
     */
    angular
        .module('revaluate.account')
        .controller('RevaluateAppController', function (flash, $location, GreeterService, AlertService, $rootScope, $scope, $state, $timeout, $log, ALERTS_EVENTS, AuthService, AccountModal, IntercomUtilsService, MixpanelUtilsService, User, StatesHandler, AUTH_EVENTS, ALERTS_CONSTANTS, AUTH_MODAL, ERROR_INTERCEPTOR, ENV, APP_CONFIG) {

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

            // ---
            // Bootstrap intercom & mixpanel.
            // ---
            if (AuthService.isAuthenticated()) {
                IntercomUtilsService.bootIntercom($rootScope.currentUser);

                if (ENV.isProduction) {
                    MixpanelUtilsService.bootMixpanel($rootScope.currentUser);
                }
            } else {
                MixpanelUtilsService.initMixpanel();
            }

            if (!ENV.isProduction) {
                $log.log('Current user: ', $rootScope.currentUser.model);
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
                IntercomUtilsService.bootIntercom($rootScope.currentUser, $location.search().ref);

                if (ENV.isProduction) {
                    // ---
                    // Bootstrap mixpanel people.
                    // ---
                    MixpanelUtilsService.bootMixpanel($rootScope.currentUser);
                }

                if (!ENV.isProduction) {
                    $log.log('Logged in: ', $rootScope.currentUser.model);
                }
            });

            /**
             * Sometimes we need to refresh the user from the local storage.
             */
            $scope.$on(AUTH_EVENTS.refreshUser, function (event, args) {
                $rootScope.currentUser = User.$new().loadFromSession();

                // ---
                // Refresh intercom user.
                // ---
                IntercomUtilsService.updateIntercom($rootScope.currentUser, args.intercomAttributes);

                if (ENV.isProduction) {
                    // ---
                    // Refresh intercom user.
                    // ---
                    MixpanelUtilsService.updateMixpanel($rootScope.currentUser);
                }

                if (!ENV.isProduction) {
                    $log.log('Refreshed user: ', $rootScope.currentUser.model);
                }
            });

            /**
             * Listen to the session timeout event
             */
            $scope.$on(AUTH_EVENTS.sessionTimeout, function () {
                if (!ENV.isProduction) {
                    $log.log('Session timed out.');
                }

                AuthService.logout();
            });

            /**
             * Listen to the not authenticated event
             */
            $scope.$on(AUTH_EVENTS.notAuthenticated, function () {
                if (!ENV.isProduction) {
                    $log.log('Not authenticated.');
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
                if (!ENV.isProduction) {
                    $log.log('Logged out.');
                }
            });

            /**
             * Track events.
             */
            $rootScope.$on('trackEvent', function (event, args) {
                if (!ENV.isProduction) {
                    return;
                }

                mixpanel.track(args);
                IntercomUtilsService.trackEvent(args);
            });

            /**
             * Track activity
             */
            $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                if (toState.stateEventName) {
                    $scope.$emit('trackEvent', toState.stateEventName);
                }

                // ---
                // Say HI.
                // ---
                $rootScope.greet = GreeterService.greet();
            });

            $rootScope.$on('$viewContentLoaded', function () {
                // ---
                // Close login modal if everything is loaded.
                // ---
                if (AccountModal.isOpen) {
                    $rootScope.$broadcast(AUTH_MODAL.close, {});
                }
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

                flash.to(ALERTS_CONSTANTS.generalError).error = 'Payment method required.';
            });

            // ---
            // Alerts.
            // ---
            $scope.$on(ALERTS_EVENTS.INFO, function (event, args) {
                AlertService.addInfo(args);
            });

            $scope.$on(ALERTS_EVENTS.DANGER, function (event, args) {
                if (args.alertId) {
                    flash.to(args.alertId).error = args.message;
                } else {
                    AlertService.addDanger(args);
                }
            });

            $scope.$on(ALERTS_EVENTS.CLEAR, function (event, args) {
                if (args.alertId) {
                    flash.to(args.alertId).error = '';
                }
            });

            $scope.$on(ALERTS_EVENTS.WARNING, function (event, args) {
                AlertService.addWarning(args);
            });

            $scope.$on(ALERTS_EVENTS.SUCCESS, function (event, args) {
                if (args.alertId) {
                    flash.to(args.alertId).success = args.message;
                } else {
                    AlertService.addSuccess(args);
                }
            });
        });
}());
