export default angular
  .module('revaluate.integrations', [
    'revaluate.common',
  ])
  .config(function ($stateProvider) {

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
          integrations: function (IntegrationsService) {
            return IntegrationsService
              .getAllIntegrations();
          },
        },
        title: 'Integrations - Revaluate',
        stateEventName: 'integrations-main',
      });
  });
