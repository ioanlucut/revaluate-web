'use strict';

deferredBootstrapper
    .bootstrap({
        element: document.documentElement,
        module: "revaluate",
        injectorModules: "config",
        moduleResolves: [
            {
                module: "revaluate.common",
                resolve: {
                    APP_CONFIG: ['ENV', '$http', function (ENV, $http) {
                        URLTo.apiBase(ENV.apiEndpoint);

                        return $http
                            .get(URLTo.api("appconfig/fetchConfig"));
                    }
                    ]
                }
            }
        ]
    });
