import IntercomUtilsService from './intercom/IntercomUtilsService'

export default angular
  .module('revaluate.intercom', [
    'ngIntercom',
    'config',
  ])
  .service('IntercomUtilsService', IntercomUtilsService)
  .config(($intercomProvider, ENV) => {
    $intercomProvider
      .appID(ENV.intercomAppId);
    $intercomProvider
      .asyncLoading(true);
  });
