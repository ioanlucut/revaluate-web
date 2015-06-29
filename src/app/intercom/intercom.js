'use strict';

angular
    .module("revaluate.intercom", [
        "ngIntercom",
        "config"
    ])
    .config(function ($intercomProvider, ENV) {
        $intercomProvider
            .appID("c509geda");
        $intercomProvider
            .asyncLoading(true)
    });
