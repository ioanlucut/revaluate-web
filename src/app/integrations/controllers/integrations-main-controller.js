(function () {
    'use strict';

    angular
        .module('revaluate.integrations')
        .controller('IntegrationsMainController', function ($scope, $rootScope, INTEGRATIONS_CONSTANTS, ALERTS_EVENTS, USER_ACTIVITY_EVENTS, ENV, OAuth2Service, StatesHandler, IntegrationsService, promiseTracker, integrations) {

            var vm = this;

            vm.user = $rootScope.currentUser;

            /**
             * Available integrations
             */
            vm.integrations = integrations;

            // ---
            // If new oauth integration is added.
            // ---
            vm.redirectUri = INTEGRATIONS_CONSTANTS.returnUriFormat.format(ENV.redirectUri);
            vm.state = JSON.stringify({ userId: vm.user.model.id });
            vm.scope = 'identify';

            /**
             * Create an deleting tracker.
             */
            vm.deleteTracker = promiseTracker();

            /**
             * Create an add tracker.
             */
            vm.addTracker = promiseTracker();

            /**
             * Delete category;
             */
            vm.deleteIntegration = deleteIntegration;

            /*
             * Add integration functionality.
             */
            vm.addIntegrationOf = addIntegrationOf;

            // ---
            // Private methods.
            // ---
            function deleteIntegration(entry) {
                IntegrationsService
                    .deleteIntegration(entry, vm.deleteTracker)
                    .then(function () {
                        _.remove(vm.integrations, 'id', entry.id);

                        $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Deleted');
                        $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.appIntegrationDeleted);
                    })
                    .catch(function () {
                        $scope.$emit(ALERTS_EVENTS.DANGER, 'Error');
                    });
            }

            function addIntegrationOf(provider) {
                OAuth2Service
                    .connectWithAppGet(provider)
                    .then(function (profile) {
                        createOauthEntryWith(profile, vm.addTracker);
                    })
                    .then(null, function () {
                        $scope.$emit(ALERTS_EVENTS.DANGER, 'Sorry, something went wrong.');
                    });
            }

            function createOauthEntryWith(profile, tracker) {
                IntegrationsService
                    .addIntegrationAs(profile, tracker)
                    .then(function (addedIntegration) {
                        $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.appIntegrated);

                        $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Integration successfully added.');

                        vm.integrations.push(addedIntegration);
                        vm.accordionStatus.isOpen = false;
                    })
                    .catch(function () {
                        $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.appIntegrationFailed);

                        $scope.$emit(ALERTS_EVENTS.DANGER, 'Could not add integration.');
                    });
            }

        });
}());
