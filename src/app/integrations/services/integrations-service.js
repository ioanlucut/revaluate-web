(function () {
    'use strict';

    function IntegrationsService(INTEGRATIONS_CONSTANTS, $http) {

        this.createOauthEntry = function (code, redirectUri, tracker) {
            return $http
                .get(URLTo.api(INTEGRATIONS_CONSTANTS.createOauthEntry, {
                    ':code': code,
                    ':redirect_uri': redirectUri
                }, { tracker: tracker }));
        };
    }

    angular
        .module('revaluate.integrations')
        .service('IntegrationsService', IntegrationsService);
}());
