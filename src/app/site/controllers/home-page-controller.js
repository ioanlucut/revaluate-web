(function () {
    'use strict';

    angular
        .module('revaluate.common')
        .controller('HomePageController', function (APP_STATS, SiteService, $scope, $timeout) {
            var TIMEOUT = 4000; // POOL every 10 seconds

            (function tick() {
                SiteService
                    .fetchInstant()
                    .then(function (response) {
                        $scope.$broadcast('update-app-stats', { appStats: response.data });

                        $timeout(tick, TIMEOUT);
                    });
            })();

        });
}());
