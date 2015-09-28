(function () {
    'use strict';

    function IntegrationAuthorizedController(ALERTS_EVENTS, USER_ACTIVITY_EVENTS, INTEGRATIONS_CONSTANTS, ALERTS_CONSTANTS, ENV, StatesHandler, IntegrationsService, $timeout, $location, $scope, $rootScope) {

        var vm = this,
            AUTHORIZATION_TIMEOUT = 100,
            REDIRECT_TIMEOUT = 5000;

        /**
         * Alert identifier
         */
        vm.alertId = ALERTS_CONSTANTS.oauthIntegrations;

        /**
         * The current user
         */
        vm.user = $rootScope.currentUser;

        /**
         * Creates the oauth entry
         */
        vm.createOauthEntry = createOauthEntry;

        //$location.search().state !== $rootScope.currentUser.model.id

        // ---
        // Try to authorize.
        // ---
        if (!_.isUndefined($location.search().code)) {
            vm.createOauthEntry();
        } else {
            $timeout(function () {
                $scope.$emit(ALERTS_EVENTS.DANGER, {
                    message: 'The URL format is invalid. Please try again.',
                    alertId: vm.alertId
                });

            }, AUTHORIZATION_TIMEOUT);
        }

        // ---
        // Private functions.
        // ---

        function createOauthEntry() {
            IntegrationsService
                .createOauthEntry($location.search().code, INTEGRATIONS_CONSTANTS.returnUriFormat.format(ENV.redirectUri))
                .then(function () {
                    $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.appIntegrated);

                    $scope.$emit(ALERTS_EVENTS.SUCCESS, {
                        message: 'Integration successfully added. Redirecting..',
                        alertId: vm.alertId
                    });

                    $timeout(function () {
                        StatesHandler.goToIntegrations();
                    }, REDIRECT_TIMEOUT);
                })
                .catch(function () {
                    $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.appIntegrationFailed);

                    $scope.$emit(ALERTS_EVENTS.DANGER, {
                        message: 'Could not authorize integration. Please make sure the URL is proper.',
                        alertId: vm.alertId
                    });

                })
                .finally(function () {
                    vm.isAuthCallFinished = true;
                });
        }

    }

    angular
        .module('revaluate.integrations')
        .controller('IntegrationAuthorizedController', IntegrationAuthorizedController);
}());
