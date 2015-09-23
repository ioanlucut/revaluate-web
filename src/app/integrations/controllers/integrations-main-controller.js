(function () {
    'use strict';

    angular
        .module('revaluate.integrations')
        .controller('IntegrationsMainController', function ($scope, $rootScope, INTEGRATIONS_CONSTANTS, ENV, integrations) {

            var vm = this;

            vm.integrations = integrations;

            vm.user = $rootScope.currentUser;
            vm.redirectUri = INTEGRATIONS_CONSTANTS.returnUriFormat.format(ENV.redirectUri);
            vm.state = vm.user.model.id;

        });
}());
