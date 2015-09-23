(function () {
    'use strict';

    function IntegrationAuthorizedController(ALERTS_EVENTS, USER_ACTIVITY_EVENTS, INTEGRATIONS_CONSTANTS, ALERTS_CONSTANTS, ENV, IntegrationsService, $timeout, $location, $scope, $rootScope, promiseTracker) {

        var vm = this;

        /**
         * Alert identifier
         */
        this.alertId = ALERTS_CONSTANTS.oauthIntegrations;

        /**
         * The current user
         */
        this.user = $rootScope.currentUser;

        /**
         * Create a loading tracker.
         */
        vm.loadTracker = promiseTracker();

        /**
         * Creates the oauth entry
         */
        vm.createOauthEntry = createOauthEntry;

        //$location.search().state !== $rootScope.currentUser.model.id

        if (_.isUndefined($location.search().code)) {
            $timeout(function () {
                $scope.$emit(ALERTS_EVENTS.DANGER, {
                    message: 'The URL format is invalid. Please try again.',
                    alertId: vm.alertId
                });
            }, 100);
        } else {
            vm.createOauthEntry();
        }

        function createOauthEntry() {
            if (vm.loadTracker.active()) {

                return;
            }

            IntegrationsService
                .createOauthEntry($location.search().code, INTEGRATIONS_CONSTANTS.returnUriFormat.format(ENV.redirectUri), vm.loadTracker)
                .then(function () {
                    $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.appIntegrated);

                    $scope.$emit(ALERTS_EVENTS.SUCCESS, {
                        message: 'Integration added.'
                    });
                })
                .catch(function () {
                    $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.appIntegrationFailed);

                    $scope.$emit(ALERTS_EVENTS.DANGER, {
                        message: 'Could not add integration.',
                        alertId: vm.alertId
                    });
                });
        }

    }

    angular
        .module('revaluate.integrations')
        .controller('IntegrationAuthorizedController', IntegrationAuthorizedController);
}());
