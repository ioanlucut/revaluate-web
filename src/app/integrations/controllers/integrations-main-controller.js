(function () {
    'use strict';

    angular
        .module('revaluate.integrations')
        .controller('IntegrationsMainController', function ($scope, $rootScope, INTEGRATIONS_CONSTANTS, ALERTS_EVENTS, USER_ACTIVITY_EVENTS, ENV, IntegrationsService, promiseTracker, integrations) {

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
            vm.state = vm.user.model.id;

            /**
             * Create an deleting tracker.
             */
            vm.deleteTracker = promiseTracker();

            /**
             * Delete category;
             */
            vm.deleteIntegration = deleteIntegration;

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

        });
}());
