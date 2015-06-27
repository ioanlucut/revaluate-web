(function (URLTo) {
    'use strict';

    // ---
    // This is the app config skeleton.
    // ---
    window
        .APP_CONFIG_SKELETON = window.APP_CONFIG_SKELETON || {
            "VERSION": "",
            "TRIAL_DAYS": -1,
            "PREDEFINED_CATEGORIES": [],
            "CURRENCIES": [],
            "CURRENCIES_LOCALE_MAP": {},
            "ALL_COLORS": [],
            "SETUP_MIN_CATEGORIES_TO_SELECT": -1,
            "IMPORT_MIN_CATEGORIES_TO_SELECT": 0,
            "MAX_ALLOWED_CATEGORIES": -1,
            "MIN_ALLOWED_CATEGORIES": -1,
            "MIN_EXPENSES_TO_ENABLE_BULK_ACTION": -1
        };

    // ---
    // Bootstrap our angular app.
    // ---
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
                        .get(URLTo.api(APP_CONFIG_RESOURCE_URL), { cache: appCache })
                        .then(function (response) {

                            return angular
                                .extend(window.APP_CONFIG_SKELETON, response.data)
                        });
                }
                ]
            }
        });
}(window.URLTo));
