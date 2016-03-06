import IntegrationsMainController from './integrations/IntegrationsMainController';
import IntegrationsService from './integrations/IntegrationsService';
import IntegrationsTransformerService from './integrations/IntegrationsTransformerService';
import integration from './integrations/integration';
import integrationsConstants from './integrations/integrationsConstants';

export default angular
  .module('revaluate.integrations', [
    'revaluate.common',
  ])
  .controller('IntegrationsMainController', IntegrationsMainController)
  .service('IntegrationsService', IntegrationsService)
  .service('IntegrationsTransformerService', IntegrationsTransformerService)
  .factory('Integration', integration)
  .constant('INTEGRATIONS_CONSTANTS', integrationsConstants)
  .config($stateProvider => {

    $stateProvider

    // ---
    // Integrations pages.
    // ---

      .state({
        name: 'settings.integrations',
        url: '/integrations',
        templateUrl: '/app/components/integrations/integrations/integrationsAbstract.tpl.html',
        abstract: true,
      })

      .state({
        name: 'settings.integrations.main',
        url: '/main',
        templateUrl: '/app/components/integrations/integrations/integrationsMain.tpl.html',
        controller: 'IntegrationsMainController',
        controllerAs: 'vm',
        resolve: {
          integrations(IntegrationsService) {
            return IntegrationsService
              .getAllIntegrations();
          },
        },
        title: 'Integrations - Revaluate',
        stateEventName: 'integrations-main',
      });
  });
