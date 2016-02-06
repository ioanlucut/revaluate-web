'use strict';

export default angular
    .module('revaluate.intercom', [
        'ngIntercom',
        'config'
    ])
    .config(function ($intercomProvider, ENV) {
        $intercomProvider
            .appID(ENV.intercomAppId);
        $intercomProvider
            .asyncLoading(true);
    })
    .name;
