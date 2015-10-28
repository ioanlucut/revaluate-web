(function () {
    'use strict';

    angular
        .module('revaluate.common')
        .controller('HomePageController', function (APP_STATS, AUTH_EVENTS, SiteService, $scope, $timeout, AuthService) {
            var vm = this,
                currentUpdateAppStatsPromise,
                TIMEOUT = 60000; // POOL every 1 minute

            this.isUserAuthenticated = AuthService.isAuthenticated();

            if (!this.isUserAuthenticated) {
                updateAppStats();
            }

            $scope.$on('$destroy', function () {
                cancelUpdateAppStatsPromise();
            });

            // ---
            // private methods.
            // ---

            function cancelUpdateAppStatsPromise() {
                if (currentUpdateAppStatsPromise) {
                    $timeout.cancel(currentUpdateAppStatsPromise);

                    currentUpdateAppStatsPromise = null;
                }
            }

            function updateAppStats() {
                SiteService
                    .fetchInstant()
                    .then(function (response) {
                        $scope.$broadcast('update-app-stats', { appStats: response.data });

                        if (!vm.isUserAuthenticated) {
                            currentUpdateAppStatsPromise = $timeout(updateAppStats, TIMEOUT);
                        }
                    });
            }
        });
}());
