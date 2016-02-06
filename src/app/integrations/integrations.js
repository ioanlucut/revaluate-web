'use strict';

export default angular
    .module('revaluate.integrations', [
        'revaluate.common'
    ])
    .config(function ($stateProvider) {

        $stateProvider

            // ---
            // Integrations pages.
            // ---

            .state({
                name: 'settings.integrations',
                url: '/integrations',
                templateUrl: '/app/integrations/partials/integrations.abstract.tpl.html',
                abstract: true
            })

            .state({
                name: 'settings.integrations.main',
                url: '/main',
                templateUrl: '/app/integrations/partials/integrations.main.tpl.html',
                controller: 'IntegrationsMainController',
                controllerAs: 'vm',
                resolve: {
                    integrations: function (IntegrationsService) {
                        return IntegrationsService
                            .getAllIntegrations();
                    }
                },
                title: 'Integrations - Revaluate',
                stateEventName: 'integrations-main'
            });
    })
    .name;
