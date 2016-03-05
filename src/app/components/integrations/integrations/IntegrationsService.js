export default

  function IntegrationsService(INTEGRATIONS_CONSTANTS, IntegrationsTransformerService, $http) {

    this.addIntegrationAs = function (profile, tracker) {
      return $http
        .post(URLTo.api(INTEGRATIONS_CONSTANTS.addIntegration), profile, { tracker: tracker })
        .then(IntegrationsTransformerService.integrationApiResponseTransformer);
    };

    this.getAllIntegrations = function (tracker) {
      return $http
        .get(URLTo.api(INTEGRATIONS_CONSTANTS.addIntegration), { tracker: tracker })
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

