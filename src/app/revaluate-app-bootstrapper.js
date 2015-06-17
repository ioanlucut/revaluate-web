(function (URLTo) {
    'use strict';

    deferredBootstrapper
        .bootstrap({
            element: document.documentElement,
            module: "revaluate",
            injectorModules: ["config", "angular-cache"],
            resolve: {
                APP_CONFIG: ['ENV', '$http', 'CacheFactory', function (ENV, $http, CacheFactory) {
                    var APP_CACHE_FACTORY_NAME = 'appCache';
                    var APP_CONFIG_RESOURCE_URL = "appconfig/fetchConfig";

                    URLTo.apiBase(ENV.apiEndpoint);

                    if ( !CacheFactory.get(APP_CACHE_FACTORY_NAME) ) {
                        CacheFactory
                            .createCache(APP_CACHE_FACTORY_NAME, {
                                deleteOnExpire: 'aggressive',
                                recycleFreq: 60000
                            });
                    }

                    var appCache = CacheFactory
                        .get(APP_CACHE_FACTORY_NAME);

                    return $http
                        .get(URLTo.api(APP_CONFIG_RESOURCE_URL), { cache: appCache });
                }
                ]
            }
        });
}(window.URLTo));
