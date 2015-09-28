(function () {
    'use strict';

    function IntegrationsService(INTEGRATIONS_CONSTANTS, IntegrationsTransformerService, $http) {

        this.createOauthEntry = function (code, redirectUri) {
            return $http
                .post(URLTo.api(INTEGRATIONS_CONSTANTS.createOauthEntry, {
                    ':code': code,
                    ':redirect_uri': redirectUri
                }))
                .then(IntegrationsTransformerService.integrationApiResponseTransformer);
        };

        this.getAllIntegrations = function (tracker) {
            return $http
                .get(URLTo.api(INTEGRATIONS_CONSTANTS.createOauthEntry), { tracker: tracker })
                .then(IntegrationsTransformerService.integrationApiResponseTransformer);
        };

        this.deleteIntegration = function (integration, tracker) {
            return $http
                .delete(URLTo.api(INTEGRATIONS_CONSTANTS.removeOauth, { ':id': integration.id }), { tracker: tracker });
        };

    }

    angular
        .module('revaluate.integrations')
        .service('IntegrationsService', IntegrationsService);
}());
