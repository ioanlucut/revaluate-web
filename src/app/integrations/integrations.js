(function () {
    'use strict';

    angular
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
                })
                //url: '/authorized/?code&state',

                .state({
                    name: 'settings.integrations.authorized',
                    url: '/authorized',
                    controller: 'IntegrationAuthorizedController',
                    controllerAs: 'vm',
                    templateUrl: '/app/integrations/partials/integrations.authorized.tpl.html',
                    title: 'Authorized page- Revaluate',
                    stateEventName: 'integrations-authorized'
                })

                .state({
                    name: 'settings.integrations.deny',
                    url: '/denied',
                    templateUrl: '/app/integrations/partials/integrations.invalid.tpl.html',
                    title: 'Invalid confirmation email token - Revaluate',
                    stateEventName: 'integrations-denied'
                });
        });
}());
