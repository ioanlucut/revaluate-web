(function () {
    'use strict';

    function IntegrationsService(INTEGRATIONS_CONSTANTS, IntegrationsTransformerService, $http) {

        this.createOauthEntry = function (code, redirectUri, tracker) {
            return $http
                .post(URLTo.api(INTEGRATIONS_CONSTANTS.createOauthEntry, {
                    ':code': code,
                    ':redirect_uri': redirectUri
                }, { tracker: tracker }))
                .then(IntegrationsTransformerService.integrationApiResponseTransformer);
        };

        this.getAllIntegrations = function (tracker) {
            return $http
                .get(URLTo.api(INTEGRATIONS_CONSTANTS.createOauthEntry), { tracker: tracker })
                .then(IntegrationsTransformerService.integrationApiResponseTransformer);
        };

    }

    angular
        .module('revaluate.integrations')
        .service('IntegrationsService', IntegrationsService);
}());
