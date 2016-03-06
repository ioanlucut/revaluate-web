export default

function IntegrationsService(INTEGRATIONS_CONSTANTS, IntegrationsTransformerService, $http) {

  this.addIntegrationAs = (profile, tracker) => $http
    .post(URLTo.api(INTEGRATIONS_CONSTANTS.addIntegration), profile, { tracker })
    .then(IntegrationsTransformerService.integrationApiResponseTransformer);

  this.getAllIntegrations = tracker => $http
    .get(URLTo.api(INTEGRATIONS_CONSTANTS.addIntegration), { tracker })
    .then(IntegrationsTransformerService.integrationApiResponseTransformer);

  this.deleteIntegration = (integration, tracker) => $http
    .delete(URLTo.api(INTEGRATIONS_CONSTANTS.removeOauth, { ':id': integration.id }), { tracker });

}

IntegrationsService;

