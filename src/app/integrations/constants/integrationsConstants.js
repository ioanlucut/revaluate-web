(function () {
  'use strict';

  angular
    .module('revaluate.integrations')
    .constant('INTEGRATIONS_CONSTANTS', {
      addIntegration: 'oauth',
      removeOauth: 'oauth/:id',
      returnUriFormat: '{0}/account/settings/integrations/authorized',
    });
}());
