(function () {
    'use strict';

    angular
        .module('revaluate.integrations')
        .constant('INTEGRATIONS_CONSTANTS', {
            createOauthEntry: 'oauth?code=:code&redirect_uri=:redirect_uri',
            removeOauth: 'oauth/:id',
            returnUriFormat: '{0}/account/settings/integrations/authorized'
        });
}());
